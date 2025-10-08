import { Link } from "react-router-dom";
import { TrendingUp, Plus, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
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
    <>
      <style>{`
        :root {
          --electric-violet: #5C27FE;
          --dark-blue: #1A1A2E;
          --light-gray: #F9FAFB;
          --border-gray: #E5E7EB;
        }
        body {
            background-color: #FFFFFF;
            color: var(--dark-blue);
            font-family: 'Space Mono', monospace;
            background-image: radial-gradient(var(--border-gray) 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
        .font-lufga {
            font-family: 'Lufga', sans-serif;
        }
        .electric-violet-text {
            color: var(--electric-violet);
        }
        .electric-violet-bg {
            background-color: var(--electric-violet);
        }
        .electric-violet-border {
            border-color: var(--electric-violet);
        }
        .glow-effect-soft {
            box-shadow: 0 0 15px rgba(92, 39, 254, 0.5);
        }
        .card-bg {
            background-color: var(--light-gray);
            border: 1px solid var(--border-gray);
        }
        .card-hover-effect {
            transition: all 0.3s ease-in-out;
        }
        .card-hover-effect:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 0 25px rgba(92, 39, 254, 0.4);
            border-color: var(--electric-violet) !important;
        }
      `}</style>
      <div className="min-h-screen">
        <Header />
        
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-lufga text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight">
              Welcome back, <span className="electric-violet-text">Baljeet!</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">Here's what's happening with your farm today.</p>
          </motion.div>
          
          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-lg font-bold">Intelligence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <IntelligenceGauge score={farmer.intelligenceScore} />
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-lg font-bold">Credit Line</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-lufga text-3xl font-bold">₹{farmer.creditUsed.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">/ ₹{farmer.creditLine.toLocaleString()}</span>
                  </div>
                  <Progress value={creditPercentage} className="h-2 [&>div]:bg-[--electric-violet]" />
                </div>
                <Button className="w-full electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft">
                  Request Loan
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-lg font-bold">Active Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Verified</p>
                    <p className="text-sm text-gray-500">Last: 3 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">1 Active Loan</p>
                    <p className="text-sm text-gray-500">On-time payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Satellite Map */}
          <Card className="mb-8 card-bg overflow-hidden">
            <CardHeader>
              <CardTitle className="font-lufga text-xl font-bold">Farm Overview</CardTitle>
              <CardDescription className="text-gray-600">Real-time satellite view of {farmer.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-lg overflow-hidden border-2 electric-violet-border">
                <SatelliteMap 
                  center={[Number(farmer.coordinates[0][0]), Number(farmer.coordinates[0][1])]}
                  farmPolygon={farmer.coordinates.map(coord => [Number(coord[0]), Number(coord[1])])}
                  farmName={farmer.name}
                />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-500">Farm Area</p>
                  <p className="font-lufga text-2xl font-bold">{farmer.area}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-500">Current Crop</p>
                  <p className="font-lufga text-2xl font-bold">{farmer.crop}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-500">NDVI Score</p>
                  <p className="font-lufga text-2xl font-bold text-green-600">{farmer.ndviScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Marketplace Listings */}
          <Card className="card-bg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-lufga text-xl font-bold">Your Marketplace Listings</CardTitle>
                <CardDescription className="text-gray-600">Active crops for sale</CardDescription>
              </div>
              <Button asChild className="electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft gap-2">
                <Link to="/farmer/sell-crop">
                  <Plus className="h-4 w-4" />
                  Sell New Crop
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {farmerListings.map((listing) => (
                  <div 
                    key={listing.id}
                    className="group rounded-xl border bg-white p-4 transition-all duration-300 ease-in-out hover:border-[--electric-violet] hover:-translate-y-1"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-lufga font-bold text-lg">{listing.crop}</h4>
                        <p className="text-sm text-gray-500">{listing.predictedYield.value} tons</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Verified</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="font-lufga text-2xl font-bold electric-violet-text">₹{listing.totalPrice.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">₹{listing.pricePerUnit}/{listing.unit}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm border-t pt-3 mt-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Harvest: {new Date(listing.harvestDate).toLocaleDateString()}</span>
                      </div>
                      <span className="font-medium electric-violet-text flex items-center gap-1">
                        {listing.offers} offers <ArrowUpRight className="h-4 w-4"/>
                      </span>
                    </div>
                  </div>
                ))}
                
                <Link 
                  to="/farmer/sell-crop"
                  className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-4 transition-all hover:border-[--electric-violet] hover:bg-violet-50"
                >
                  <Plus className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="font-lufga font-medium text-gray-600">List New Crop</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
