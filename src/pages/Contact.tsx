 import { useState } from "react";
 import Navbar from "@/components/Navbar";
 import Footer from "@/components/Footer";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import { Card } from "@/components/ui/card";
 import { MapPin, Phone, Mail, Clock } from "lucide-react";
 import { toast } from "sonner";
 
 const Contact = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     subject: "",
     message: "",
   });
 
   const handleChange = (field: string, value: string) => {
     setFormData((prev) => ({ ...prev, [field]: value }));
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     
     await new Promise((resolve) => setTimeout(resolve, 1000));
     
     toast.success("Message sent successfully! We'll get back to you soon.");
     setFormData({ name: "", email: "", subject: "", message: "" });
     setIsLoading(false);
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container-custom section-padding">
           {/* Header */}
           <div className="text-center max-w-2xl mx-auto mb-12">
             <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
               Get In Touch
             </h1>
             <p className="text-muted-foreground">
               Have questions or need help? We're here for you. Reach out and 
               we'll respond as soon as we can.
             </p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8">
             {/* Contact Info */}
             <div className="space-y-6">
               <Card className="p-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-primary/10 p-3 rounded-lg">
                     <MapPin className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">Address</h3>
                     <p className="text-muted-foreground text-sm">
                       KG 123 Street, Kigali<br />
                       Nyarugenge District, Rwanda
                     </p>
                   </div>
                 </div>
               </Card>
               
               <Card className="p-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-primary/10 p-3 rounded-lg">
                     <Phone className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                     <p className="text-muted-foreground text-sm">
                       +250 788 123 456<br />
                       +250 722 987 654
                     </p>
                   </div>
                 </div>
               </Card>
               
               <Card className="p-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-primary/10 p-3 rounded-lg">
                     <Mail className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">Email</h3>
                     <p className="text-muted-foreground text-sm">
                       info@rwandacars.rw<br />
                       support@rwandacars.rw
                     </p>
                   </div>
                 </div>
               </Card>
               
               <Card className="p-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-primary/10 p-3 rounded-lg">
                     <Clock className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                     <p className="text-muted-foreground text-sm">
                       Monday - Friday: 8:00 AM - 6:00 PM<br />
                       Saturday: 9:00 AM - 4:00 PM
                     </p>
                   </div>
                 </div>
               </Card>
             </div>
             
             {/* Contact Form */}
             <Card className="lg:col-span-2 p-8">
               <h2 className="text-xl font-display font-bold text-foreground mb-6">
                 Send Us a Message
               </h2>
               
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="name">Your Name</Label>
                     <Input
                       id="name"
                       placeholder="Jean-Paul"
                       value={formData.name}
                       onChange={(e) => handleChange("name", e.target.value)}
                       required
                       className="h-12"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email">Email Address</Label>
                     <Input
                       id="email"
                       type="email"
                       placeholder="your@email.com"
                       value={formData.email}
                       onChange={(e) => handleChange("email", e.target.value)}
                       required
                       className="h-12"
                     />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="subject">Subject</Label>
                   <Input
                     id="subject"
                     placeholder="How can we help?"
                     value={formData.subject}
                     onChange={(e) => handleChange("subject", e.target.value)}
                     required
                     className="h-12"
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="message">Message</Label>
                   <Textarea
                     id="message"
                     placeholder="Tell us more about your inquiry..."
                     value={formData.message}
                     onChange={(e) => handleChange("message", e.target.value)}
                     required
                     rows={6}
                     className="resize-none"
                   />
                 </div>
                 
                 <Button
                   type="submit"
                   className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90"
                   disabled={isLoading}
                 >
                   {isLoading ? "Sending..." : "Send Message"}
                 </Button>
               </form>
             </Card>
           </div>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default Contact;