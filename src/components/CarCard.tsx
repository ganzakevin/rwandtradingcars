import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Fuel, Calendar, Gauge, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// Support both database format and mock format
export interface CarData {
  id: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  images?: string[];
  location: string;
  fuelType?: string;
  fuel_type?: string;
  year: number;
  mileage: number;
  status: "available" | "sold" | "pending" | "rejected";
}

interface CarCardProps {
  car: CarData;
  showFavoriteButton?: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CarCard = ({ car, showFavoriteButton = true }: CarCardProps) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Handle both image formats
  const imageUrl = car.image || car.images?.[0] || '/placeholder.svg';
  const fuelType = car.fuelType || car.fuel_type || 'Unknown';
  const isCarFavorite = isFavorite(car.id);

  return (
    <Card className="overflow-hidden card-hover bg-card border-0 shadow-card">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {car.status === "sold" && (
          <div className="absolute top-3 left-3">
            <span className="badge-sold">Sold</span>
          </div>
        )}
        {car.status === "available" && (
          <div className="absolute top-3 left-3">
            <span className="badge-available">Available</span>
          </div>
        )}
        {car.status === "pending" && (
          <div className="absolute top-3 left-3">
            <span className="bg-warning/90 text-warning-foreground text-xs font-medium px-2 py-1 rounded-full">
              Pending
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        {showFavoriteButton && user && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(car.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-colors",
              isCarFavorite
                ? "bg-destructive text-destructive-foreground"
                : "bg-card/80 text-foreground hover:bg-card"
            )}
          >
            <Heart className={cn("h-4 w-4", isCarFavorite && "fill-current")} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">{car.brand}</p>
          <h3 className="font-display font-semibold text-lg text-card-foreground line-clamp-1">
            {car.name}
          </h3>
        </div>

        <p className="price-tag mb-4">{formatPrice(car.price)}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
        </div>

        <Link to={`/cars/${car.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CarCard;
