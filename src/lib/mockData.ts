// Mock store for appointments while lacking persistent DB
import { Appointment } from "../types";

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    user_id: "user1",
    client_name: "Ali Raza",
    client_phone: "+923001234567",
    service: "Haircut & Beard",
    date: "2026-06-05",
    time: "14:00",
    status: "Confirmed",
    notes: "First time customer",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "user1",
    client_name: "Usman Khan",
    client_phone: "+923007654321",
    service: "Facial",
    date: "2026-06-06",
    time: "10:30",
    status: "Pending",
    notes: "",
    created_at: new Date().toISOString()
  }
];

export const getAppointments = () => mockAppointments;
