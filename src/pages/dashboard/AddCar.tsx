import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ImageUploader from '@/components/dashboard/ImageUploader';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const brands = [
  'Toyota', 'Mercedes-Benz', 'BMW', 'Honda', 'Hyundai', 'Volkswagen',
  'Nissan', 'Mazda', 'Subaru', 'Land Rover', 'Jeep', 'Ford', 'Other'
];

const locations = [
  'Kigali', 'Musanze', 'Rubavu', 'Huye', 'Rusizi', 'Muhanga', 'Nyagatare', 'Rwamagana'
];

const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const transmissions = ['Automatic', 'Manual'];

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    year: new Date().getFullYear().toString(),
    mileage: '',
    fuelType: '',
    transmission: 'Automatic',
    location: '',
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to add a car');
      return;
    }

    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from('cars').insert({
      user_id: user.id,
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      price: parseInt(formData.price),
      year: parseInt(formData.year),
      mileage: parseInt(formData.mileage) || 0,
      fuel_type: formData.fuelType,
      transmission: formData.transmission,
      location: formData.location,
      description: formData.description,
      images: images,
      status: 'pending',
    });

    if (error) {
      toast.error('Failed to add car: ' + error.message);
      setIsLoading(false);
      return;
    }

    toast.success('Car added successfully! It will be reviewed before going live.');
    navigate('/dashboard/my-cars');
  };

  return (
    <DashboardLayout title="Add New Car">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <h2 className="text-2xl font-display font-bold mb-6">List Your Car</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <div>
              <Label className="text-base">Photos *</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Add up to 10 photos of your car. First photo will be the cover.
              </p>
              <ImageUploader images={images} onImagesChange={setImages} />
            </div>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Title *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Land Cruiser V8 2020"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Brand *</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => handleChange('brand', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g. V8"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (RWF) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g. 45000000"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                  min={0}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g. 2020"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  required
                  min={1990}
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g. 45000"
                  value={formData.mileage}
                  onChange={(e) => handleChange('mileage', e.target.value)}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label>Location *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleChange('location', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fuel Type *</Label>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) => handleChange('fuelType', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transmission *</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => handleChange('transmission', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((trans) => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your car's condition, features, and history..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/my-cars')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit for Review'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddCar;
