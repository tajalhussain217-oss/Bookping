import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { MessageCircle, Phone, Save } from 'lucide-react';

export default function Settings() {
  const { t } = useTranslation();
  const [template, setTemplate] = useState("Hi {client_name}, reminder: your {service} at {business_name} is {date} {time}. Reply 1 to Confirm, 2 to Reschedule.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-neutral-500 mt-2">Manage your Twilio integrations and WhatsApp templates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-neutral-500" />
              <CardTitle>Twilio WhatsApp Setup</CardTitle>
            </div>
            <CardDescription className="pt-1">Connect your Twilio Account to send automated WhatsApp reminders.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <form id="twilio-form" onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <Label>Account SID</Label>
                <Input type="password" placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label>Auth Token</Label>
                <Input type="password" placeholder="••••••••••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input placeholder="whatsapp:+14155238886" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <Button type="submit" form="twilio-form" className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Save Twilio Config
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-neutral-500" />
              <CardTitle>Reminder Template</CardTitle>
            </div>
            <CardDescription className="pt-1">Customize the message sent 24h & 2h before the appointment.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Message Template</Label>
                <textarea
                  className="flex min-h-[140px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 resize-y"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                />
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-md border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Available variables:</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{`{client_name}`}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{`{service}`}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{`{business_name}`}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{`{date}`}</span>
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{`{time}`}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <Button onClick={() => toast.success("Template saved")} className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
