export type ReservationStatus = 'nouveau' | 'confirme' | 'termine' | 'annule';

export interface Reservation {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location: string;
  passengers: number;
  trip_type: string;
  special_needs: string | null;
  message: string | null;
  status: ReservationStatus;
  admin_notes: string | null;
  created_at: string;
}

export interface ReservationInput {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  dropoff_location: string;
  passengers: number;
  trip_type: string;
  special_needs?: string;
  message?: string;
}

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  nouveau: 'Nouveau',
  confirme: 'Confirmé',
  termine: 'Terminé',
  annule: 'Annulé',
};

export const STATUS_COLORS: Record<ReservationStatus, string> = {
  nouveau: 'bg-amber-100 text-amber-800 border-amber-300',
  confirme: 'bg-blue-100 text-blue-800 border-blue-300',
  termine: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  annule: 'bg-red-100 text-red-800 border-red-300',
};
