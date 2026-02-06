 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Search, Car } from "lucide-react";
 import heroImage from "@/assets/hero-cars.jpg";
 
 const Hero = () => {
   return (
     <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
       {/* Background Image */}
       <div
         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${heroImage})` }}
       />
       
       {/* Overlay */}
       <div className="absolute inset-0 gradient-overlay" />
       
       {/* Content */}
       <div className="relative z-10 container-custom section-padding pt-24">
         <div className="max-w-2xl animate-slide-up">
           <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
             Rwanda's #1 Car Marketplace
           </span>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
             Buy & Sell Cars <br />
             <span className="text-accent">Easily in Rwanda</span>
           </h1>
           
           <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-lg">
             Find your perfect car or sell yours quickly. Trusted by thousands 
             of buyers and sellers across Kigali and beyond.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4">
             <Link to="/cars">
               <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                 <Search className="h-5 w-5" />
                 Browse Cars
               </Button>
             </Link>
             <Link to="/sell">
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
               >
                 <Car className="h-5 w-5" />
                 Sell Your Car
               </Button>
             </Link>
           </div>
           
           {/* Stats */}
           <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
             <div>
               <p className="text-2xl md:text-3xl font-bold text-primary-foreground">2,500+</p>
               <p className="text-sm text-primary-foreground/70">Cars Listed</p>
             </div>
             <div>
               <p className="text-2xl md:text-3xl font-bold text-primary-foreground">1,200+</p>
               <p className="text-sm text-primary-foreground/70">Happy Buyers</p>
             </div>
             <div>
               <p className="text-2xl md:text-3xl font-bold text-primary-foreground">98%</p>
               <p className="text-sm text-primary-foreground/70">Satisfaction</p>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default Hero;