import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, CreditCard, Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function Billing() {
  const { t } = useTranslation();

  const handleSubscribe = () => {
    toast.info("Redirecting to Lemon Squeezy checkout...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('billing')}</h1>
        <p className="text-neutral-500 mt-2">Manage your subscription and billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-neutral-500" />
              <CardTitle>Current Plan</CardTitle>
            </div>
            <CardDescription className="pt-1">You are currently on the Free trial.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Free Trial</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Active</span>
                </div>
                <p className="text-sm text-neutral-500">Your trial expires in 7 days.</p>
              </div>
              <Button onClick={handleSubscribe} className="shrink-0 w-full sm:w-auto">Upgrade Now</Button>
            </div>

            <h4 className="font-medium mt-8 mb-4">Billing History</h4>
            <div className="text-center py-8 border-2 border-dashed rounded-lg bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500">No past invoices available.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-blue-600 dark:border-blue-500 shadow-md relative overflow-hidden flex flex-col">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <CardHeader>
             <div className="flex items-center justify-between mb-2">
               <div className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">BookPing Pro</div>
               <Sparkles className="w-4 h-4 text-blue-500" />
             </div>
            <CardTitle className="text-4xl font-extrabold flex items-baseline">
              Rs 1,499<span className="text-sm font-normal text-neutral-500 tracking-normal ml-1">/mo</span>
            </CardTitle>
            <CardDescription className="pt-2">Everything you need to eliminate no-shows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Check className="text-blue-500 shrink-0 mt-0.5" size={16} /> 
                <span className="text-neutral-700 dark:text-neutral-300">100 WhatsApp Reminders/mo</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-blue-500 shrink-0 mt-0.5" size={16} /> 
                <span className="text-neutral-700 dark:text-neutral-300">Auto-Confirm Replies (1 or 2)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-blue-500 shrink-0 mt-0.5" size={16} /> 
                <span className="text-neutral-700 dark:text-neutral-300">24h & 2h Notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-blue-500 shrink-0 mt-0.5" size={16} /> 
                <span className="text-neutral-700 dark:text-neutral-300">Custom Templates</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubscribe}>
              <Zap className="w-4 h-4 mr-2" /> Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
