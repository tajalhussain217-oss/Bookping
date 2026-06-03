import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "BookPing",
      "dashboard": "Dashboard",
      "appointments": "Appointments",
      "settings": "Settings",
      "billing": "Billing",
      "new_appointment": "New Appointment",
      "total_bookings": "Total Bookings",
      "confirmed": "Confirmed",
      "no_shows": "No-Shows",
      "sign_in": "Sign In",
      "business_name": "Business Name",
      "phone": "Phone",
      "login_google": "Login with Google",
      "client_name": "Client Name",
      "service": "Service",
      "date": "Date",
      "time": "Time",
      "status": "Status",
      "actions": "Actions"
    }
  },
  ur: {
    translation: {
      "app_name": "بک پنگ",
      "dashboard": "ڈیش بورڈ",
      "appointments": "اپائنٹمنٹس",
      "settings": "ترتیبات",
      "billing": "بلنگ",
      "new_appointment": "نئی اپائنٹمنٹ",
      "total_bookings": "کل بکنگز",
      "confirmed": "تصدیق شدہ",
      "no_shows": "نو شوز",
      "sign_in": "لاگ ان کریں",
      "business_name": "کاروبار کا نام",
      "phone": "فون نمبر",
      "login_google": "گوگل کے ساتھ لاگ ان کریں",
      "client_name": "کلائنٹ کا نام",
      "service": "سروس",
      "date": "تاریخ",
      "time": "وقت",
      "status": "حالت",
      "actions": "کارروائیاں"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
