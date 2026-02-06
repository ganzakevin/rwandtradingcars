import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Car } from '@/types/database';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      setFavoriteIds(new Set());
      setFavoriteCars([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data } = await supabase
      .from('favorites')
      .select('car_id, cars(*)')
      .eq('user_id', user.id);

    if (data) {
      setFavoriteIds(new Set(data.map(f => f.car_id)));
      setFavoriteCars(data.map(f => f.cars).filter(Boolean) as Car[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (carId: string) => {
    if (!user) {
      toast.error('Please log in to save cars');
      return;
    }

    const isFavorite = favoriteIds.has(carId);

    if (isFavorite) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('car_id', carId);

      if (!error) {
        setFavoriteIds(prev => {
          const next = new Set(prev);
          next.delete(carId);
          return next;
        });
        setFavoriteCars(prev => prev.filter(c => c.id !== carId));
        toast.success('Removed from favorites');
      }
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, car_id: carId });

      if (!error) {
        setFavoriteIds(prev => new Set(prev).add(carId));
        toast.success('Added to favorites');
        // Refetch to get full car data
        fetchFavorites();
      }
    }
  };

  const isFavorite = (carId: string) => favoriteIds.has(carId);

  return { favoriteIds, favoriteCars, isLoading, toggleFavorite, isFavorite, refetch: fetchFavorites };
};
