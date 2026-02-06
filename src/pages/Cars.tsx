import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters, { FilterValues } from "@/components/SearchFilters";
import CarCard from "@/components/CarCard";
import Footer from "@/components/Footer";
import { useCars } from "@/hooks/useCars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const defaultFilters: FilterValues = {
  search: "",
  brand: "",
  priceMin: "",
  priceMax: "",
  location: "",
  fuelType: "",
  year: "",
};

const Cars = () => {
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [sortBy, setSortBy] = useState("newest");
  
  // Fetch cars from database
  const { cars: dbCars, isLoading } = useCars({
    brand: filters.brand,
    location: filters.location,
    minPrice: filters.priceMin ? parseInt(filters.priceMin) : undefined,
    maxPrice: filters.priceMax ? parseInt(filters.priceMax) : undefined,
    fuelType: filters.fuelType,
  });

  // Use only database cars for display
  const allCars = dbCars.map((car) => ({
    ...car,
    image: car.images?.[0] || '/placeholder.svg',
    fuelType: car.fuel_type || car.fuelType,
  }));

  const handleSearch = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const sortedCars = [...allCars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "year-new":
        return b.year - a.year;
      case "year-old":
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Browse All Cars
            </h1>
            <p className="text-muted-foreground mt-2">
              Find your perfect car from our wide selection
            </p>
          </div>
          
          {/* Search & Filters */}
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} />
          </div>
          
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                <>
                  Showing <span className="font-medium text-foreground">{sortedCars.length}</span> cars
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest</SelectItem>
                  <SelectItem value="year-old">Year: Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Car Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCars.map((car) => (
                <CarCard key={car.id} car={car as any} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cars;
