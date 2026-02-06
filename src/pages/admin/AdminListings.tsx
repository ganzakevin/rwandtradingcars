import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Eye, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const AdminListings = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchCars = async () => {
    setLoading(true);
    let query = supabase
      .from('cars')
      .select('*, profiles!cars_user_id_fkey(full_name, email)')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data } = await query;
    setCars(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [statusFilter]);

  const handleStatusChange = async (carId: string, newStatus: string) => {
    const { error } = await supabase
      .from('cars')
      .update({ status: newStatus })
      .eq('id', carId);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchCars();
    }
  };

  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    const { error } = await supabase.from('cars').delete().eq('id', carId);

    if (error) {
      toast.error('Failed to delete listing');
    } else {
      toast.success('Listing deleted');
      fetchCars();
    }
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(search.toLowerCase()) ||
    car.brand.toLowerCase().includes(search.toLowerCase()) ||
    car.profiles?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Listings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, brand, or seller..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={car.images?.[0] || '/placeholder.svg'}
                          alt={car.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{car.name}</p>
                          <p className="text-sm text-muted-foreground">{car.brand} • {car.year}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatPrice(car.price)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{car.profiles?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{car.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={car.status}
                        onValueChange={(value) => handleStatusChange(car.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link to={`/cars/${car.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(car.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCars.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No listings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminListings;
