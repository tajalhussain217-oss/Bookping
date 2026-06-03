import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Globe } from 'lucide-react';

export default function Login() {
  const { t, i18n } = useTranslation();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState(1);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(nextLang);
    document.dir = nextLang === 'ur' ? 'rtl' : 'ltr';
  };

  const isRtl = i18n.language === 'ur';

  const handleGoogleLogin = () => {
    // Mock login step 1
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handleFinishSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({
      id: "u_new",
      email: "user@example.com",
      business_name: formData.get('business_name') as string,
      business_type: formData.get('business_type') as string,
      phone: formData.get('phone') as string,
      lemonsqueezy_customer_id: "",
      created_at: new Date().toISOString()
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 ${isRtl ? 'font-ur' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
        <Button variant="ghost" size="sm" onClick={toggleLanguage}>
          <Globe className="mr-2" size={16} />
          {i18n.language === 'en' ? 'اردو' : 'English'}
        </Button>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {t('app_name')}
        </h1>
        <p className="text-neutral-500 mt-2">Eliminate no-shows with automated WhatsApp reminders</p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-0 bg-white/50 backdrop-blur-xl dark:bg-neutral-950/50">
        {step === 1 ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('sign_in')}</CardTitle>
              <CardDescription>Login or create an account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button variant="outline" className="h-12 w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.34 18.42 22.56 15.58 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.77 16.72 5.88 14.16H2.2V17.02C4.01 20.61 7.7 23 12 23Z" fill="#34A853"/>
                    <path d="M5.88 14.16C5.65 13.48 5.52 12.76 5.52 12C5.52 11.24 5.65 10.52 5.88 9.84V6.98H2.2C1.45 8.48 1 10.18 1 12C1 13.82 1.45 15.52 2.2 17.02L5.88 14.16Z" fill="#FBBC05"/>
                    <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.46 2.13 14.97 1 12 1C7.7 1 4.01 3.39 2.2 6.98L5.88 9.84C6.77 7.28 9.17 5.38 12 5.38Z" fill="#EA4335"/>
                  </svg>
                  {t('login_google')}
                </Button>
                <div className="relative font-sans text-xs flex justify-center text-neutral-400 mt-2 mb-2">
                  <span className="bg-white/50 dark:bg-neutral-950 px-2 absolute -mt-2">OR</span>
                  <hr className="w-full border-neutral-200 dark:border-neutral-800" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <Button className="w-full h-11" onClick={() => setStep(2)}>Continue with Email</Button>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Welcome to BookPing! 👋</CardTitle>
              <CardDescription>Let's get your clinic/salon set up.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinishSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business_name">{t('business_name')}</Label>
                  <Input id="business_name" name="business_name" required placeholder="Grooming Lounge" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Input id="business_type" name="business_type" required placeholder="Salon, Clinic, Dentist, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input id="phone" name="phone" required placeholder="+923001234567" />
                </div>
                <Button type="submit" className="w-full h-11 mt-4">Complete Setup</Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
