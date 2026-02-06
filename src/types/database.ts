export type AppRole = 'admin' | 'user';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: string;
  user_id: string;
  name: string;
  brand: string;
  model: string | null;
  price: number;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  location: string;
  description: string | null;
  status: 'pending' | 'available' | 'sold' | 'rejected';
  images: string[];
  created_at: string;
  updated_at: string;
  // Joined fields
  seller?: Profile;
}

export interface Favorite {
  id: string;
  user_id: string;
  car_id: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  car_id: string | null;
  buyer_id: string;
  seller_id: string;
  last_message_at: string;
  created_at: string;
  // Joined fields
  car?: Car;
  buyer?: Profile;
  seller?: Profile;
  last_message?: Message;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
  // Joined fields
  sender?: Profile;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}
