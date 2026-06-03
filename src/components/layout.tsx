import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Calendar as CalendarIcon, Settings, CreditCard, LogOut, Globe, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthStore } from '../store/auth';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, setUser } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(nextLang);
    document.dir = nextLang === 'ur' ? 'rtl' : 'ltr';
  };

  if (!user) {
    return <Outlet />; // Let the auth routes render without sidebar
  }

  const isRtl = i18n.language === 'ur';

  const navItems = [
    { name: t('dashboard'), path: '/', icon: <LayoutDashboard size={20} /> },
    { name: t('appointments'), path: '/appointments', icon: <CalendarIcon size={20} /> },
    { name: t('settings'), path: '/settings', icon: <Settings size={20} /> },
    { name: t('billing'), path: '/billing', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className={`flex flex-col md:flex-row h-screen bg-neutral-50 dark:bg-neutral-900 ${isRtl ? 'font-ur' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
        <span className="text-xl font-bold font-sans tracking-tight text-neutral-900 dark:text-white">
          {t('app_name')}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <Globe size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-neutral-500 hover:text-red-500">
            <LogOut size={20} />
          </Button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 bg-white dark:bg-neutral-950 border-${isRtl ? 'l' : 'r'} border-neutral-200 dark:border-neutral-800 shrink-0`}>
        <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <span className="text-2xl font-bold font-sans tracking-tight text-blue-600 dark:text-blue-500 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            BookPing
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
              }`}
            >
              <span className={isRtl ? 'ml-3' : 'mr-3'}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 shrink-0 space-y-3">
          <Button variant="outline" className="w-full justify-start text-sm" onClick={toggleLanguage}>
            <Globe className={isRtl ? 'ml-2' : 'mr-2'} size={18} />
            {i18n.language === 'en' ? 'اردو' : 'English'}
          </Button>
          <div className="flex items-center px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                {user.business_name}
              </p>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 ml-1 text-neutral-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors dark:hover:bg-red-900/30"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-[calc(4rem+1px)] md:pb-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around px-2 pb-safe z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
              }`}
            >
              <span className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
