import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, DollarSign, MessageCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Sell = () => {
  const { user } = useAuth();

  // If user is logged in, redirect to add car page
  if (user) {
    return <Navigate to="/dashboard/add-car" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom section-padding">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Sell Your Car Fast
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Reach thousands of potential buyers across Rwanda. List your car 
              for free and get fair offers quickly.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Selling Now
              </Button>
            </Link>
          </div>
          
          {/* How it Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-10">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                  <Camera className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Create Listing</h3>
                <p className="text-muted-foreground text-sm">
                  Add photos and details about your car
                </p>
              </Card>
              
              <Card className="p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                  <DollarSign className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Set Your Price</h3>
                <p className="text-muted-foreground text-sm">
                  Price it competitively in RWF
                </p>
              </Card>
              
              <Card className="p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Get Inquiries</h3>
                <p className="text-muted-foreground text-sm">
                  Receive messages from interested buyers
                </p>
              </Card>
              
              <Card className="p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                  <CheckCircle className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Close the Deal</h3>
                <p className="text-muted-foreground text-sm">
                  Meet buyers and complete the sale
                </p>
              </Card>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="bg-secondary rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                  Why Sell on RwandaCars?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Free Listings</p>
                      <p className="text-muted-foreground text-sm">List your car at no cost</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Wide Reach</p>
                      <p className="text-muted-foreground text-sm">Access thousands of buyers across Rwanda</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Easy Management</p>
                      <p className="text-muted-foreground text-sm">Update listings and respond to inquiries from your dashboard</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Safe Transactions</p>
                      <p className="text-muted-foreground text-sm">We verify all buyers for your peace of mind</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-card rounded-xl p-8 shadow-card">
                  <p className="text-4xl font-bold text-primary mb-2">0 RWF</p>
                  <p className="text-muted-foreground mb-4">to list your car</p>
                  <Link to="/signup">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Create Free Account
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;
