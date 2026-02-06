import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserCars } from '@/hooks/useCars';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, Eye, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const MyCars = () => {
  const { cars, isLoading, refetch } = useUserCars();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (carId: string) => {
    setDeletingId(carId);
    const { error } = await supabase.from('cars').delete().eq('id', carId);
    
    if (error) {
      toast.error('Failed to delete car');
    } else {
      toast.success('Car deleted successfully');
      refetch();
    }
    setDeletingId(null);
  };

  const handleMarkAsSold = async (carId: string) => {
    const { error } = await supabase
      .from('cars')
      .update({ status: 'sold' })
      .eq('id', carId);
    
    if (error) {
      toast.error('Failed to update car');
    } else {
      toast.success('Car marked as sold');
      refetch();
    }
  };

  return (
    <DashboardLayout title="My Cars">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold">My Listings</h2>
            <p className="text-muted-foreground">Manage your car listings</p>
          </div>
          <Link to="/dashboard/add-car">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Car
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cars.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
              <p className="text-muted-foreground mb-6">
                Start selling by adding your first car listing.
              </p>
              <Link to="/dashboard/add-car">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Car
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {cars.map((car) => (
              <Card key={car.id} className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={car.images?.[0] || '/placeholder.svg'}
                    alt={car.name}
                    className="w-full sm:w-40 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{car.name}</h3>
                        <p className="text-primary font-bold">{formatPrice(car.price)}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        car.status === 'available' ? 'bg-success/10 text-success' :
                        car.status === 'pending' ? 'bg-warning/10 text-warning' :
                        car.status === 'sold' ? 'bg-muted text-muted-foreground' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {car.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                      <span>{car.year}</span>
                      <span>•</span>
                      <span>{car.fuel_type}</span>
                      <span>•</span>
                      <span>{car.location}</span>
                      <span>•</span>
                      <span>{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link to={`/cars/${car.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Link to={`/dashboard/edit-car/${car.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      {car.status === 'available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsSold(car.id)}
                        >
                          Mark as Sold
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="gap-1">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              car listing.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(car.id)}
                              disabled={deletingId === car.id}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {deletingId === car.id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyCars;
