import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockAppointments } from '../lib/mockData';
import { Calendar } from '../components/ui/calendar';
import { CalendarCheck, Users, CalendarX2 } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const total = mockAppointments.length;
  const confirmed = mockAppointments.filter(a => a.status === 'Confirmed').length;
  const noShows = mockAppointments.filter(a => a.status === 'No-Show').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
          <p className="text-neutral-500 mt-2">Welcome back, {user?.business_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">{t('total_bookings')}</CardTitle>
            <Users className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total}</div>
            <p className="text-xs text-neutral-500 mt-1">For all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">{t('confirmed')}</CardTitle>
            <CalendarCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{confirmed}</div>
            <p className="text-xs text-neutral-500 mt-1">Awaiting arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">{t('no_shows')}</CardTitle>
            <CalendarX2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{noShows}</div>
            <p className="text-xs text-neutral-500 mt-1">Missed appointments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <p className="text-sm text-neutral-500">Your schedule for the next few days.</p>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {mockAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white">{apt.client_name}</h4>
                    <p className="text-sm text-neutral-500">{apt.service} • {apt.date} at {apt.time}</p>
                  </div>
                  <div className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                    apt.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                    apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-neutral-100 text-neutral-800 border-neutral-200'
                  }`}>
                    {apt.status}
                  </div>
                </div>
              ))}
              {mockAppointments.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                  <p className="text-sm text-neutral-500">No upcoming appointments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <p className="text-sm text-neutral-500">Pick a date to view schedules</p>
          </CardHeader>
          <CardContent className="flex justify-center flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border shadow-sm p-3 w-full max-w-[300px] flex justify-center"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
