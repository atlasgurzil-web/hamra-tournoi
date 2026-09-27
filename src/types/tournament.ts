export interface Tournament {
  id: string;
  slug: string;
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
  start_time: string;
  location: string;
  cadence: string;
  rounds: number;
  registration_fee: number;
  max_players: number;
  status: 'published' | 'ongoing' | 'completed';
  registration_open: boolean;
  confirmed_count: number;
  waitlist_count: number;
  paid_count: number;
  is_full: boolean;
  spots_left: number;
  organizer?: {
    club_name: string;
    phone: string;
    email: string;
    website: string;
  };
}

export interface PlayerRegistration {
  id: string;
  tournament_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  phone?: string;
  email?: string;
  sex: 'M' | 'F';
  club?: string;
  fide_id?: string;
  rating?: number;
  bib_number: number;
  created_at: string;
}
