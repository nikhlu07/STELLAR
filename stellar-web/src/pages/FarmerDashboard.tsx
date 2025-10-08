import { Link } from "react-router-dom";
import { TrendingUp, Plus, Clock, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import IntelligenceGauge from "@/components/IntelligenceGauge";
import SatelliteMap from "@/components/SatelliteMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockFarms, mockCropListings } from "@/lib/mockData";
import { motion } from "framer-motion";

const FarmerDashboard = () => {
  const farmer = mockFarms[0];
  const farmerListings = mockCropListings.filter(l => l.farmId === farmer.id);
  const creditPercentage = (farmer.creditUsed / farmer.creditLine) * 100;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-4xl font-bold">Welcome back, Baljeet! 👋</h1>
          <p className="mb-8 text-muted-foreground">Here's what's happening with your farm today</p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="border-primary/20 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Intelligence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <IntelligenceGauge score={farmer.intelligenceScore} />
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Credit Line</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-3xl font-bold">₹{farmer.creditUsed.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/ ₹{farmer.creditLine.toLocaleString()}</span>
                </div>
                <Progress value={creditPercentage} className="h-2" />
              </div>
              <Button className="w-full" size="sm">
                Request Additional Loan
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-success/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Verified</p>
                  <p className="text-sm text-muted-foreground">Last: 3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">1 Active Loan</p>
                  <p className="text-sm text-muted-foreground">On-time payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Satellite Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
            <CardDescription>Real-time satellite view of {farmer.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <SatelliteMap 
                center={[Number(farmer.coordinates[0][0]), Number(farmer.coordinates[0][1])]}
                farmPolygon={farmer.coordinates.map(coord => [Number(coord[0]), Number(coord[1])])}
                farmName={farmer.name}
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Farm Area</p>
                <p className="text-2xl font-bold">{farmer.area}</p>
              </div>
              <div className="rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Current Crop</p>
                <p className="text-2xl font-bold">{farmer.crop}</p>
              </div>
              <div className="rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">NDVI Score</p>
                <p className="text-2xl font-bold text-success">{farmer.ndviScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Marketplace Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Marketplace Listings</CardTitle>
              <CardDescription>Active crops for sale</CardDescription>
            </div>
            <Button asChild className="gap-2">
              <Link to="/farmer/sell-crop">
                <Plus className="h-4 w-4" />
                Sell New Crop
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {farmerListings.map((listing) => (
                <div 
                  key={listing.id}
                  className="group rounded-lg border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold">{listing.crop}</h4>
                      <p className="text-sm text-muted-foreground">{listing.predictedYield.value} tons</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <span className="text-xs font-medium text-success">Verified</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-2xl font-bold text-primary">₹{listing.totalPrice.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">₹{listing.pricePerUnit}/{listing.unit}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Harvest: {new Date(listing.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <span className="font-medium text-primary">{listing.offers} offers</span>
                  </div>
                </div>
              ))}
              
              <Link 
                to="/farmer/sell-crop"
                className="flex min-h-[180px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-4 transition-all hover:border-primary hover:bg-primary/5"
              >
                <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                <span className="font-medium">List New Crop</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
