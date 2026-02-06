import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import CarCard from '@/components/CarCard';
import { useFavorites } from '@/hooks/useFavorites';
import { Loader2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Favorites = () => {
  const { favoriteCars, isLoading } = useFavorites();

  return (
    <DashboardLayout title="Saved Cars">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Saved Cars</h2>
          <p className="text-muted-foreground">Cars you've saved for later</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : favoriteCars.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved cars yet</h3>
              <p className="text-muted-foreground mb-6">
                Browse our listings and save cars you're interested in.
              </p>
              <Link to="/cars">
                <Button>Browse Cars</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteCars.map((car) => (
              <CarCard key={car.id} car={car} showFavoriteButton />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Favorites;
