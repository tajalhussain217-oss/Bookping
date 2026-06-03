import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Appointment } from '../types';
import { mockAppointments } from '../lib/mockData';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Plus, Search, CalendarDays } from 'lucide-react';

export default function Appointments() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredAppointments = appointments.filter(a => 
    a.client_name.toLowerCase().includes(search.toLowerCase()) || 
    a.client_phone.includes(search)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'No-Show': return 'bg-neutral-200 text-neutral-800 border-neutral-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApt: Appointment = {
      id: Math.random().toString(),
      user_id: 'user1',
      client_name: formData.get('client_name') as string,
      client_phone: formData.get('client_phone') as string,
      service: formData.get('service') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      status: 'Pending',
      notes: '',
      created_at: new Date().toISOString()
    };
    setAppointments([newApt, ...appointments]);
    setIsDialogOpen(false);
    toast.success("Appointment created successfully");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('appointments')}</h1>
          <p className="text-neutral-500 mt-2">Manage your bookings and automated reminders.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button className="w-full sm:w-auto" />}>
            <Plus className="w-4 h-4 mr-2" />
            {t('new_appointment')}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-neutral-500" />
                {t('new_appointment')}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="client_name">{t('client_name')}</Label>
                <Input id="client_name" name="client_name" required placeholder="Ex. Ali Raza" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_phone">{t('phone')}</Label>
                <Input id="client_phone" name="client_phone" type="tel" placeholder="+92 300 1234567" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">{t('service')}</Label>
                <Input id="service" name="service" required placeholder="Ex. Haircut" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t('date')}</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t('time')}</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
              <Button type="submit" className="w-full mt-2">Create & Schedule Reminder</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
          <Input 
            className="pl-9 bg-white dark:bg-neutral-950" 
            placeholder="Search by name or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-neutral-50/50 dark:bg-neutral-900/50">
            <TableRow>
              <TableHead>{t('client_name')}</TableHead>
              <TableHead>{t('service')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('time')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((apt) => (
              <TableRow key={apt.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50">
                <TableCell>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{apt.client_name}</div>
                  <div className="text-xs text-neutral-500">{apt.client_phone}</div>
                </TableCell>
                <TableCell className="text-neutral-600 dark:text-neutral-400">{apt.service}</TableCell>
                <TableCell className="text-neutral-600 dark:text-neutral-400">{apt.date}</TableCell>
                <TableCell className="text-neutral-600 dark:text-neutral-400">{apt.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(apt.status)} shadow-sm`}>
                    {apt.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select defaultValue={apt.status} onValueChange={(val) => {
                    setAppointments(appointments.map(a => a.id === apt.id ? {...a, status: val as any} : a));
                    toast.success("Status updated");
                  }}>
                    <SelectTrigger className="w-[120px] ml-auto h-8 text-xs font-medium">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="No-Show">No-Show</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {filteredAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-neutral-500">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-neutral-300 mb-2" />
                    <p>No appointments found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
