import { Link } from "react-router-dom";
import { TrendingUp, CheckCircle2, Calendar, Star, Filter, Search } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCropListings } from "@/lib/mockData";
import { motion } from "framer-motion";

const CropMarketplace = () => {
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
        .input-field {
            background-color: #FFFFFF;
            border: 1px solid var(--border-gray);
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease-in-out;
        }
        .input-field:focus {
            outline: none;
            border-color: var(--electric-violet);
            box-shadow: 0 0 0 2px rgba(92, 39, 254, 0.2);
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
              Crop <span className="electric-violet-text">Marketplace</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">Discover satellite-verified produce from trusted farms.</p>
          </motion.div>
          
          {/* Filters */}
          <Card className="mb-8 card-bg">
            <CardHeader>
              <CardTitle className="font-lufga text-xl font-bold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Sort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input placeholder="Search by crop or farm..." className="input-field pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="<50k">Under ₹50,000</SelectItem>
                    <SelectItem value="50k-75k">₹50,000 - ₹75,000</SelectItem>
                    <SelectItem value=">75k">Above ₹75,000</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Sort by Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quality">Quality Score</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="harvest_date">Harvest Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Marketplace Listings */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCropListings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <Card className="card-bg card-hover-effect h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-lufga text-2xl font-bold">{listing.crop}</CardTitle>
                        <CardDescription className="text-gray-600 hover:underline">
                          <Link to={`/farm/${listing.farmId}`}>{listing.farmName}</Link>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3">
                        <p className="text-sm text-gray-500">Predicted Yield</p>
                        <p className="font-lufga text-2xl font-bold">{listing.predictedYield.value} tons</p>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                          <span>NDVI: <span className="font-bold text-green-600">{listing.ndviScore}</span></span>
                          <span>Quality: <span className="font-bold electric-violet-text">{listing.quality}/100</span></span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="font-lufga text-3xl font-bold electric-violet-text">₹{listing.totalPrice.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">₹{listing.pricePerUnit}/{listing.unit}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-200 pt-3">
                        <Calendar className="h-4 w-4" />
                        <span>Harvest: {new Date(listing.harvestDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1 electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft">
                        Buy Now
                      </Button>
                      <Button variant="outline" className="flex-1 electric-violet-border electric-violet-text hover:bg-violet-50">
                        Make Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-10 text-center">
            <Button size="lg" variant="outline" className="electric-violet-border electric-violet-text hover:bg-violet-50 hover:text-violet-700">
              Load More Listings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropMarketplace;
