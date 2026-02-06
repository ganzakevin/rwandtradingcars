 import { useState } from "react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Search, SlidersHorizontal, X } from "lucide-react";
 
 interface SearchFiltersProps {
   onSearch?: (filters: FilterValues) => void;
   compact?: boolean;
 }
 
 export interface FilterValues {
   search: string;
   brand: string;
   priceMin: string;
   priceMax: string;
   location: string;
   fuelType: string;
   year: string;
 }
 
 const brands = [
   "All Brands",
   "Toyota",
   "Honda",
   "Mercedes-Benz",
   "BMW",
   "Volkswagen",
   "Nissan",
   "Hyundai",
   "Kia",
   "Suzuki",
   "Mitsubishi",
 ];
 
 const locations = [
   "All Locations",
   "Kigali",
   "Musanze",
   "Rubavu",
   "Huye",
   "Rusizi",
   "Muhanga",
   "Nyagatare",
   "Rwamagana",
 ];
 
 const fuelTypes = ["All Fuel Types", "Petrol", "Diesel", "Hybrid", "Electric"];
 
 const years = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "Before 2018"];
 
 const SearchFilters = ({ onSearch, compact = false }: SearchFiltersProps) => {
   const [showFilters, setShowFilters] = useState(!compact);
   const [filters, setFilters] = useState<FilterValues>({
     search: "",
     brand: "",
     priceMin: "",
     priceMax: "",
     location: "",
     fuelType: "",
     year: "",
   });
 
   const handleFilterChange = (key: keyof FilterValues, value: string) => {
     const newFilters = { ...filters, [key]: value };
     setFilters(newFilters);
   };
 
   const handleSearch = () => {
     onSearch?.(filters);
   };
 
   const clearFilters = () => {
     const emptyFilters: FilterValues = {
       search: "",
       brand: "",
       priceMin: "",
       priceMax: "",
       location: "",
       fuelType: "",
       year: "",
     };
     setFilters(emptyFilters);
     onSearch?.(emptyFilters);
   };
 
   return (
     <div className="bg-card rounded-xl shadow-card p-6">
       {/* Search Bar */}
       <div className="flex gap-3 mb-4">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           <Input
             placeholder="Search by car name, brand, or model..."
             className="pl-10 h-12"
             value={filters.search}
             onChange={(e) => handleFilterChange("search", e.target.value)}
           />
         </div>
         {compact && (
           <Button
             variant="outline"
             className="h-12 gap-2"
             onClick={() => setShowFilters(!showFilters)}
           >
             <SlidersHorizontal className="h-4 w-4" />
             Filters
           </Button>
         )}
         <Button className="h-12 px-6 bg-primary hover:bg-primary/90" onClick={handleSearch}>
           <Search className="h-5 w-5 md:mr-2" />
           <span className="hidden md:inline">Search</span>
         </Button>
       </div>
 
       {/* Filters */}
       {showFilters && (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-border animate-fade-in">
           <Select
             value={filters.brand}
             onValueChange={(value) => handleFilterChange("brand", value)}
           >
             <SelectTrigger>
               <SelectValue placeholder="Brand" />
             </SelectTrigger>
             <SelectContent>
               {brands.map((brand) => (
                 <SelectItem key={brand} value={brand}>
                   {brand}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
 
           <Select
             value={filters.location}
             onValueChange={(value) => handleFilterChange("location", value)}
           >
             <SelectTrigger>
               <SelectValue placeholder="Location" />
             </SelectTrigger>
             <SelectContent>
               {locations.map((loc) => (
                 <SelectItem key={loc} value={loc}>
                   {loc}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
 
           <Input
             type="number"
             placeholder="Min Price (RWF)"
             value={filters.priceMin}
             onChange={(e) => handleFilterChange("priceMin", e.target.value)}
           />
 
           <Input
             type="number"
             placeholder="Max Price (RWF)"
             value={filters.priceMax}
             onChange={(e) => handleFilterChange("priceMax", e.target.value)}
           />
 
           <Select
             value={filters.fuelType}
             onValueChange={(value) => handleFilterChange("fuelType", value)}
           >
             <SelectTrigger>
               <SelectValue placeholder="Fuel Type" />
             </SelectTrigger>
             <SelectContent>
               {fuelTypes.map((fuel) => (
                 <SelectItem key={fuel} value={fuel}>
                   {fuel}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
 
           <Select
             value={filters.year}
             onValueChange={(value) => handleFilterChange("year", value)}
           >
             <SelectTrigger>
               <SelectValue placeholder="Year" />
             </SelectTrigger>
             <SelectContent>
               {years.map((year) => (
                 <SelectItem key={year} value={year}>
                   {year}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
 
           <Button variant="ghost" onClick={clearFilters} className="col-span-2 md:col-span-3 lg:col-span-6 gap-2">
             <X className="h-4 w-4" />
             Clear Filters
           </Button>
         </div>
       )}
     </div>
   );
 };
 
 export default SearchFilters;