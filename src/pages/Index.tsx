 import { Link } from "react-router-dom";
 import Navbar from "@/components/Navbar";
 import Hero from "@/components/Hero";
 import SearchFilters from "@/components/SearchFilters";
 import CarCard from "@/components/CarCard";
 import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCars } from "@/hooks/useCars";
 import { ArrowRight, Shield, Zap, Users } from "lucide-react";
 
 const Index = () => {
  const { cars: dbCars } = useCars();
  const featuredCars = (dbCars || []).slice(0, 4).map((c: any) => ({
    ...c,
    image: c.images?.[0] || '/placeholder.svg',
    fuelType: c.fuel_type || c.fuelType,
  }));
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       {/* Hero Section */}
       <Hero />
       
       {/* Search Section */}
       <section className="-mt-12 relative z-20 container-custom section-padding">
         <SearchFilters />
       </section>
       
       {/* Featured Cars */}
       <section className="py-16 container-custom section-padding">
         <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-3xl font-display font-bold text-foreground">Featured Cars</h2>
             <p className="text-muted-foreground mt-1">Explore our most popular listings</p>
           </div>
           <Link to="/cars">
             <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
               View All <ArrowRight className="h-4 w-4" />
             </Button>
           </Link>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {featuredCars.map((car) => (
             <CarCard key={car.id} car={car} />
           ))}
         </div>
       </section>
       
       {/* Why Choose Us */}
       <section className="py-16 bg-secondary">
         <div className="container-custom section-padding">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-display font-bold text-foreground">Why Choose RwandaCars?</h2>
             <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
               We make buying and selling cars in Rwanda simple, safe, and reliable.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-card p-8 rounded-xl shadow-card text-center">
               <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Shield className="h-8 w-8 text-primary" />
               </div>
               <h3 className="font-display font-semibold text-xl mb-2">Verified Sellers</h3>
               <p className="text-muted-foreground text-sm">
                 All sellers are verified to ensure safe and trustworthy transactions.
               </p>
             </div>
             
             <div className="bg-card p-8 rounded-xl shadow-card text-center">
               <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Zap className="h-8 w-8 text-accent" />
               </div>
               <h3 className="font-display font-semibold text-xl mb-2">Quick Listings</h3>
               <p className="text-muted-foreground text-sm">
                 List your car in minutes and reach thousands of potential buyers.
               </p>
             </div>
             
             <div className="bg-card p-8 rounded-xl shadow-card text-center">
               <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Users className="h-8 w-8 text-success" />
               </div>
               <h3 className="font-display font-semibold text-xl mb-2">Large Community</h3>
               <p className="text-muted-foreground text-sm">
                 Join thousands of buyers and sellers across Rwanda.
               </p>
             </div>
           </div>
         </div>
       </section>
       
       {/* CTA Section */}
       <section className="py-16 bg-primary">
         <div className="container-custom section-padding text-center">
           <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
             Ready to Sell Your Car?
           </h2>
           <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
             List your car for free and connect with serious buyers in Rwanda.
           </p>
           <Link to="/sell">
             <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
               Start Selling Today
             </Button>
           </Link>
         </div>
       </section>
       
       <Footer />
     </div>
   );
 };
 
 export default Index;
