 import Navbar from "@/components/Navbar";
 import Footer from "@/components/Footer";
 import { Card } from "@/components/ui/card";
 import { Target, Eye, Users, Award } from "lucide-react";
 
 const About = () => {
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container-custom section-padding">
           {/* Hero */}
           <div className="text-center max-w-3xl mx-auto mb-16">
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
               About RwandaCars
             </h1>
             <p className="text-lg text-muted-foreground leading-relaxed">
               Rwanda's trusted marketplace connecting car buyers and sellers 
               since 2020. We're committed to making car transactions simple, 
               safe, and accessible for everyone.
             </p>
           </div>
           
           {/* Mission & Vision */}
           <div className="grid md:grid-cols-2 gap-8 mb-16">
             <Card className="p-8">
               <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                 <Target className="h-7 w-7 text-primary" />
               </div>
               <h2 className="text-xl font-display font-bold text-foreground mb-3">
                 Our Mission
               </h2>
               <p className="text-muted-foreground leading-relaxed">
                 To revolutionize the car market in Rwanda by providing a transparent, 
                 efficient, and trustworthy platform where buyers find their perfect 
                 cars and sellers reach the right audience.
               </p>
             </Card>
             
             <Card className="p-8">
               <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                 <Eye className="h-7 w-7 text-accent" />
               </div>
               <h2 className="text-xl font-display font-bold text-foreground mb-3">
                 Our Vision
               </h2>
               <p className="text-muted-foreground leading-relaxed">
                 To become East Africa's leading automotive marketplace, setting the 
                 standard for digital car transactions and creating a seamless 
                 experience for all users.
               </p>
             </Card>
           </div>
           
           {/* Stats */}
           <div className="bg-primary rounded-2xl p-8 md:p-12 mb-16">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                   2,500+
                 </p>
                 <p className="text-primary-foreground/70">Cars Listed</p>
               </div>
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                   1,200+
                 </p>
                 <p className="text-primary-foreground/70">Happy Buyers</p>
               </div>
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                   500+
                 </p>
                 <p className="text-primary-foreground/70">Trusted Sellers</p>
               </div>
               <div>
                 <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                   30
                 </p>
                 <p className="text-primary-foreground/70">Districts Covered</p>
               </div>
             </div>
           </div>
           
           {/* Values */}
           <div className="text-center mb-12">
             <h2 className="text-3xl font-display font-bold text-foreground mb-4">
               Our Values
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               These core values guide everything we do at RwandaCars.
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
             <Card className="p-6 text-center">
               <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Users className="h-6 w-6 text-success" />
               </div>
               <h3 className="font-display font-semibold text-lg mb-2">Trust</h3>
               <p className="text-muted-foreground text-sm">
                 We verify all sellers and promote honest, transparent transactions.
               </p>
             </Card>
             
             <Card className="p-6 text-center">
               <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Award className="h-6 w-6 text-primary" />
               </div>
               <h3 className="font-display font-semibold text-lg mb-2">Quality</h3>
               <p className="text-muted-foreground text-sm">
                 We maintain high standards for listings and user experience.
               </p>
             </Card>
             
             <Card className="p-6 text-center">
               <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Target className="h-6 w-6 text-accent" />
               </div>
               <h3 className="font-display font-semibold text-lg mb-2">Innovation</h3>
               <p className="text-muted-foreground text-sm">
                 We continuously improve to serve our community better.
               </p>
             </Card>
           </div>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default About;