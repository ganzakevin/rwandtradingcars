import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Car } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

export const useCars = (filters?: {
  brand?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  status?: string;
}) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('cars')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (filters?.brand && filters.brand !== 'all') {
        query = query.eq('brand', filters.brand);
      }
      if (filters?.location && filters.location !== 'all') {
        query = query.eq('location', filters.location);
      }
      if (filters?.fuelType && filters.fuelType !== 'all') {
        query = query.eq('fuel_type', filters.fuelType);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setCars((data || []) as Car[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cars');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [filters?.brand, filters?.location, filters?.fuelType, filters?.minPrice, filters?.maxPrice]);

  return { cars, isLoading, error, refetch: fetchCars };
};

export const useUserCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserCars = async () => {
    if (!user) return;

    setIsLoading(true);
    const { data } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setCars((data || []) as Car[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserCars();
  }, [user]);

  return { cars, isLoading, refetch: fetchUserCars };
};

export const useCarById = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      setCar(data as Car | null);
      setIsLoading(false);
    };

    if (id) fetchCar();
  }, [id]);

  return { car, isLoading };
};
