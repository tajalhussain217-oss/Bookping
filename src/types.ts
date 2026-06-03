export interface User {
  id: string;
  email: string;
  business_name: string;
  business_type: string;
  phone: string;
  lemonsqueezy_customer_id: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  client_name: string;
  client_phone: string;
  service: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'No-Show';
  notes: string;
  created_at: string;
}

export interface Message {
  id: string;
  appointment_id: string;
  content: string;
  direction: 'outbound' | 'inbound';
  sent_at: string;
  status: 'delivered' | 'read' | 'failed' | 'sent';
}

export interface Subscription {
  id: string;
  user_id: string;
  status: 'active' | 'trialing' | 'canceled' | 'past_due';
  plan: 'free' | 'pro';
  current_period_end: string;
}
