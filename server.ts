import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import crypto from "crypto";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use raw parser for Lemon Squeezy webhooks
  app.use("/api/lemonsqueezy/webhook", express.raw({ type: "application/json" }));
  // Extract body for other JSON endpoints
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // for Twilio webhooks

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Twilio Webhook (Reply 1 to confirm, 2 to reschedule)
  app.post("/api/twilio/webhook", async (req, res) => {
    // In a real app we'd verify the twilio signature
    const Body = req.body.Body?.trim() || "";
    const From = req.body.From || "";

    // Ideally, we look up the appointment by phone number and time.
    // For now, this is a mock handler as we don't have a live DB connection here.
    console.log(`Received WhatsApp reply from ${From}: ${Body}`);

    // Send TwiML response
    const twiml = new twilio.twiml.MessagingResponse();
    if (Body === "1") {
      twiml.message("Thank you! Your appointment is confirmed.");
    } else if (Body === "2") {
      twiml.message("Please call or visit our website to reschedule.");
    }

    res.type("text/xml").send(twiml.toString());
  });

  // Lemon Squeezy Webhook
  app.post("/api/lemonsqueezy/webhook", async (req, res) => {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("No webhook secret configured");

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(req.body).digest("hex"), "utf8");
    const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return res.status(403).send("Invalid signature");
    }

    try {
      const payload = JSON.parse(req.body.toString());
      const eventName = payload.meta.event_name;
      
      switch (eventName) {
        case "order_created":
          console.log("Order created:", payload.data.id);
          // Update user subscription status in DB
          break;
        case "subscription_created":
          console.log("Subscription created:", payload.data.id);
          break;
        // Handle other event types
      }

      res.status(200).send();
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
