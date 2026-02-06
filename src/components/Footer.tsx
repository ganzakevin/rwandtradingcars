 import { Link } from "react-router-dom";
 import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
 
 const Footer = () => {
   return (
     <footer className="bg-sidebar text-sidebar-foreground">
       <div className="container-custom section-padding py-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {/* Brand */}
           <div>
             <Link to="/" className="flex items-center gap-2 mb-4">
               <div className="bg-sidebar-primary p-2 rounded-lg">
                 <Car className="h-5 w-5 text-sidebar-primary-foreground" />
               </div>
               <span className="font-display text-xl font-bold">RwandaCars</span>
             </Link>
             <p className="text-sidebar-foreground/70 text-sm leading-relaxed mb-4">
               Rwanda's trusted marketplace for buying and selling quality cars. 
               Connecting buyers and sellers since 2020.
             </p>
             <div className="flex gap-3">
               <a href="#" className="p-2 bg-sidebar-accent rounded-lg hover:bg-sidebar-primary transition-colors">
                 <Facebook className="h-4 w-4" />
               </a>
               <a href="#" className="p-2 bg-sidebar-accent rounded-lg hover:bg-sidebar-primary transition-colors">
                 <Twitter className="h-4 w-4" />
               </a>
               <a href="#" className="p-2 bg-sidebar-accent rounded-lg hover:bg-sidebar-primary transition-colors">
                 <Instagram className="h-4 w-4" />
               </a>
             </div>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-display font-semibold mb-4">Quick Links</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/cars" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Browse Cars
                 </Link>
               </li>
               <li>
                 <Link to="/sell" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Sell Your Car
                 </Link>
               </li>
               <li>
                 <Link to="/about" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   About Us
                 </Link>
               </li>
               <li>
                 <Link to="/contact" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Contact
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Support */}
           <div>
             <h4 className="font-display font-semibold mb-4">Support</h4>
             <ul className="space-y-2">
               <li>
                 <a href="#" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Help Center
                 </a>
               </li>
               <li>
                 <a href="#" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Safety Tips
                 </a>
               </li>
               <li>
                 <a href="#" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Terms of Service
                 </a>
               </li>
               <li>
                 <a href="#" className="text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm transition-colors">
                   Privacy Policy
                 </a>
               </li>
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h4 className="font-display font-semibold mb-4">Contact Us</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2 text-sidebar-foreground/70 text-sm">
                 <MapPin className="h-4 w-4 shrink-0" />
                 <span>Kigali, Rwanda</span>
               </li>
               <li className="flex items-center gap-2 text-sidebar-foreground/70 text-sm">
                 <Phone className="h-4 w-4 shrink-0" />
                 <span>+250 788 123 456</span>
               </li>
               <li className="flex items-center gap-2 text-sidebar-foreground/70 text-sm">
                 <Mail className="h-4 w-4 shrink-0" />
                 <span>info@rwandacars.rw</span>
               </li>
             </ul>
           </div>
         </div>
 
         <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
           <p className="text-sidebar-foreground/50 text-sm">
             © {new Date().getFullYear()} RwandaCars. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;