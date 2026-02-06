import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCarById } from "@/hooks/useCars";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { useStartConversation } from "@/hooks/useMessages";
import {
  ArrowLeft,
  MapPin,
  Fuel,
  Calendar,
  Gauge,
  Phone,
  MessageCircle,
  User,
  Share2,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { startConversation } = useStartConversation();
  
  // Fetch car from database
  const { car: dbCar, isLoading } = useCarById(id || '');
  const car = dbCar;

  const handleContact = async () => {
    if (!user) {
      toast.error("Please log in to contact the seller");
      navigate("/login");
      return;
    }

    if (!dbCar?.user_id) {
      toast.error("Seller contact not available for this listing");
      return;
    }

    const conversationId = await startConversation(dbCar.user_id, dbCar.id);
    if (conversationId) {
      navigate(`/dashboard/messages?conversation=${conversationId}`);
    } else {
      toast.error("Failed to start conversation");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container-custom section-padding text-center py-20">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Car Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The car you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/cars">
              <Button>Browse All Cars</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isCarFavorite = isFavorite(car.id);
  const imageUrl = car.images?.[0] || '/placeholder.svg';
  const fuelType = car.fuel_type || (car as any).fuelType || 'Unknown';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom section-padding">
          {/* Back Button */}
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                {car.status === "sold" && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <span className="bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-bold text-xl">
                      SOLD
                    </span>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={img}
                        alt={`${car.name} ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Car Info */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{car.brand}</p>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {car.name}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    {user && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleFavorite(car.id)}
                        className={cn(
                          isCarFavorite && "bg-destructive/10 border-destructive text-destructive"
                        )}
                      >
                        <Heart className={cn("h-4 w-4", isCarFavorite && "fill-current")} />
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-3xl font-bold text-primary mb-6">
                  {formatPrice(car.price)}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{car.location}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Fuel className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium">{fuelType}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <Gauge className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-medium">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
              </Card>
              
              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-display font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {car.description || `This ${car.year} ${car.brand} ${car.name.split(" ")[0]} is in excellent condition. 
                  Well-maintained with complete service history. Features include ${car.transmission || 'automatic'} 
                  transmission, air conditioning, power windows, and much more. Perfect for 
                  both city driving and long journeys on Rwandan roads.`}
                </p>
              </Card>
            </div>
            
            {/* Seller Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-lg font-display font-semibold mb-4">Seller Information</h2>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Verified Seller</p>
                    <p className="text-sm text-muted-foreground">Contact for details</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                    onClick={handleContact}
                    disabled={!dbCar}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleContact}
                    disabled={!dbCar}
                  >
                    <Phone className="h-4 w-4" />
                    Show Phone Number
                  </Button>
                </div>
                
                {!user && (
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    <Link to="/login" className="text-primary hover:underline">
                      Login
                    </Link>{" "}
                    to contact seller
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
