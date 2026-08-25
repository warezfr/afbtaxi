import { useEffect, useState, useCallback } from 'react';
import {
  LayoutDashboard,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Inbox,
  LogOut,
  Phone,
  MessageCircle,
  Search,
  ChevronRight,
  X,
  Save,
  Trash2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';
import {
  type Reservation,
  type ReservationStatus,
  STATUS_LABELS,
  STATUS_COLORS,
} from '@/lib/types';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Reservation | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reservations:', error);
    } else if (data) {
      setReservations(data as Reservation[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = {
    total: reservations.length,
    today: reservations.filter(
      (r) => r.pickup_date === new Date().toISOString().split('T')[0]
    ).length,
    nouveau: reservations.filter((r) => r.status === 'nouveau').length,
    confirme: reservations.filter((r) => r.status === 'confirme').length,
    termine: reservations.filter((r) => r.status === 'termine').length,
    annule: reservations.filter((r) => r.status === 'annule').length,
  };

  const filtered = reservations
    .filter((r) => filter === 'all' || r.status === filter)
    .filter(
      (r) =>
        search === '' ||
        `${r.first_name} ${r.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search)
    );

  const updateStatus = async (id: string, status: ReservationStatus) => {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      if (selected?.id === id) {
        setSelected({ ...selected, status });
      }
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from('reservations')
      .update({ admin_notes: notes })
      .eq('id', id);

    if (!error) {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, admin_notes: notes } : r))
      );
      if (selected?.id === id) {
        setSelected({ ...selected, admin_notes: notes });
      }
    }
  };

  const deleteReservation = async (id: string) => {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (!error) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      setSelected(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const STAT_CARDS = [
    {
      label: 'Total',
      value: stats.total,
      icon: Inbox,
      color: 'text-neutral-700 bg-neutral-100',
    },
    {
      label: "Aujourd'hui",
      value: stats.today,
      icon: CalendarClock,
      color: 'text-blue-700 bg-blue-100',
    },
    {
      label: 'Nouveaux',
      value: stats.nouveau,
      icon: LayoutDashboard,
      color: 'text-amber-700 bg-amber-100',
    },
    {
      label: 'Confirmés',
      value: stats.confirme,
      icon: CheckCircle2,
      color: 'text-blue-700 bg-blue-100',
    },
    {
      label: 'Terminés',
      value: stats.termine,
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      label: 'Annulés',
      value: stats.annule,
      icon: XCircle,
      color: 'text-red-700 bg-red-100',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src={COMPANY.logoUrl}
              alt={COMPANY.name}
              className="h-10 w-10 rounded-full bg-white object-contain"
            />
            <div>
              <span className="block font-bold text-neutral-900">
                {COMPANY.name} — Backoffice
              </span>
              <span className="text-xs text-neutral-500">
                Gestion des réservations
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              Voir le site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-neutral-900">Tableau de bord</h1>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-xl border border-neutral-200 bg-white p-4"
              >
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
                >
                  <Icon size={20} />
                </div>
                <div className="text-2xl font-bold text-neutral-900">
                  {card.value}
                </div>
                <div className="text-sm text-neutral-500">{card.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-neutral-900">
            Réservations ({filtered.length})
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par nom ou téléphone..."
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 pl-9 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 sm:w-64"
              />
            </div>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReservationStatus | 'all')
              }
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option value="all">Tous les statuts</option>
              <option value="nouveau">Nouveaux</option>
              <option value="confirme">Confirmés</option>
              <option value="termine">Terminés</option>
              <option value="annule">Annulés</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-neutral-500">
            Chargement des réservations...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-white py-16 text-center">
            <Inbox size={48} className="mx-auto mb-4 text-neutral-300" />
            <p className="text-neutral-500">
              Aucune réservation à afficher.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-neutral-600">
                    Client
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase text-neutral-600 sm:table-cell">
                    Trajet
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-bold uppercase text-neutral-600 lg:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-neutral-600">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase text-neutral-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="cursor-pointer border-b border-neutral-100 transition-colors hover:bg-yellow-50"
                    onClick={() => setSelected(r)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-neutral-900">
                        {r.first_name} {r.last_name}
                      </div>
                      <div className="text-sm text-neutral-500">{r.phone}</div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="text-sm text-neutral-700">
                        {r.pickup_location}
                      </div>
                      <div className="text-xs text-neutral-400">
                        → {r.dropoff_location}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <div className="text-sm text-neutral-700">
                        {new Date(r.pickup_date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {r.pickup_time}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLORS[r.status]}`}
                      >
                        {STATUS_LABELS[r.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight
                        size={18}
                        className="text-neutral-400"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selected && (
        <ReservationDetail
          reservation={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(status) => updateStatus(selected.id, status)}
          onNotesChange={(notes) => updateNotes(selected.id, notes)}
          onDelete={() => deleteReservation(selected.id)}
        />
      )}
    </div>
  );
}

function ReservationDetail({
  reservation,
  onClose,
  onStatusChange,
  onNotesChange,
  onDelete,
}: {
  reservation: Reservation;
  onClose: () => void;
  onStatusChange: (status: ReservationStatus) => void;
  onNotesChange: (notes: string) => void;
  onDelete: () => void;
}) {
  const [notes, setNotes] = useState(reservation.admin_notes || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onNotesChange(notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${reservation.phone.replace(/[^0-9]/g, '')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-900/50 backdrop-blur-sm sm:items-center">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
          <h3 className="text-lg font-bold text-neutral-900">
            Détail de la réservation
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailField label="Prénom" value={reservation.first_name} />
            <DetailField label="Nom" value={reservation.last_name} />
            <DetailField label="Téléphone" value={reservation.phone} />
            <DetailField
              label="Email"
              value={reservation.email || '—'}
            />
            <DetailField
              label="Date du trajet"
              value={new Date(reservation.pickup_date).toLocaleDateString('fr-FR')}
            />
            <DetailField
              label="Heure du trajet"
              value={reservation.pickup_time}
            />
            <DetailField
              label="Lieu de départ"
              value={reservation.pickup_location}
            />
            <DetailField
              label="Lieu d'arrivée"
              value={reservation.dropoff_location}
            />
            <DetailField
              label="Passagers"
              value={String(reservation.passengers)}
            />
            <DetailField
              label="Type de trajet"
              value={
                reservation.trip_type === 'aller_simple'
                  ? 'Aller simple'
                  : 'Aller-retour'
              }
            />
            <DetailField
              label="Besoins particuliers"
              value={reservation.special_needs || '—'}
            />
            <DetailField
              label="Reçu le"
              value={new Date(reservation.created_at).toLocaleString('fr-FR')}
            />
          </div>

          {reservation.message && (
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-500">
                Message du client
              </label>
              <p className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-800">
                {reservation.message}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${reservation.phone}`}
              className="flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              <Phone size={16} />
              Appeler
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-500">
              Statut
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                ['nouveau', 'confirme', 'termine', 'annule'] as ReservationStatus[]
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    reservation.status === status
                      ? `${STATUS_COLORS[status]} ring-2 ring-offset-1`
                      : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400'
                  }`}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-500">
              Notes internes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter une note interne..."
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-yellow-300"
              >
                <Save size={16} />
                Enregistrer
              </button>
              {saved && (
                <span className="text-sm text-emerald-600">
                  Notes enregistrées !
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4">
            <button
              onClick={() => {
                if (
                  confirm(
                    'Êtes-vous sûr de vouloir supprimer cette réservation ?'
                  )
                ) {
                  onDelete();
                }
              }}
              className="flex items-center gap-2 text-sm font-medium text-red-600 transition-colors hover:text-red-800"
            >
              <Trash2 size={16} />
              Supprimer cette réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-500">
        {label}
      </label>
      <p className="text-sm font-medium text-neutral-900">{value}</p>
    </div>
  );
}
