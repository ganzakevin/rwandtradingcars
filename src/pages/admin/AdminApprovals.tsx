import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const AdminApprovals = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingCars = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('cars')
      .select('*, profiles!cars_user_id_fkey(full_name, email, phone)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    setCars(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingCars();
  }, []);

  const handleApprove = async (carId: string) => {
    const { error } = await supabase
      .from('cars')
      .update({ status: 'available' })
      .eq('id', carId);

    if (error) {
      toast.error('Failed to approve listing');
    } else {
      toast.success('Listing approved');
      fetchPendingCars();
    }
  };

  const handleReject = async (carId: string) => {
    const { error } = await supabase
      .from('cars')
      .update({ status: 'rejected' })
      .eq('id', carId);

    if (error) {
      toast.error('Failed to reject listing');
    } else {
      toast.success('Listing rejected');
      fetchPendingCars();
    }
  };

  return (
    <AdminLayout title="Pending Approvals">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Pending Approvals</h2>
          <p className="text-muted-foreground">Review and approve car listings</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cars.length === 0 ? (
          <Card className="p-12 text-center">
            <Check className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              There are no listings waiting for approval.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {cars.map((car) => (
              <Card key={car.id} className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Images */}
                  <div className="md:col-span-1">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-2">
                      <img
                        src={car.images?.[0] || '/placeholder.svg'}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {car.images?.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {car.images.slice(1, 5).map((img: string, idx: number) => (
                          <div key={idx} className="aspect-video rounded overflow-hidden bg-muted">
                            <img
                              src={img}
                              alt={`${car.name} ${idx + 2}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{car.brand}</p>
                        <h3 className="text-xl font-display font-bold">{car.name}</h3>
                        <p className="text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
                      </div>
                      <span className="bg-warning/10 text-warning text-xs px-2 py-1 rounded-full font-medium">
                        Pending
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{car.year}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mileage</p>
                        <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fuel Type</p>
                        <p className="font-medium">{car.fuel_type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">{car.location}</p>
                      </div>
                    </div>

                    {car.description && (
                      <div>
                        <p className="text-muted-foreground text-sm">Description</p>
                        <p className="text-sm">{car.description}</p>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-2">Seller Information</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{car.profiles?.full_name}</p>
                          <p className="text-sm text-muted-foreground">{car.profiles?.email}</p>
                          {car.profiles?.phone && (
                            <p className="text-sm text-muted-foreground">{car.profiles.phone}</p>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submitted {format(new Date(car.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleApprove(car.id)}
                        className="gap-2 bg-success hover:bg-success/90"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(car.id)}
                        variant="destructive"
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                      <Link to={`/cars/${car.id}`}>
                        <Button variant="outline" className="gap-2">
                          <Eye className="h-4 w-4" />
                          Preview
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminApprovals;
