import { Link } from "react-router-dom";
import { TrendingUp, CheckCircle2, Calendar, Star } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCropListings } from "@/lib/mockData";
import { motion } from "framer-motion";

const CropMarketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-4xl font-bold">Verified Crop Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Satellite-Verified Quality • Fair AI Pricing
          </p>
        </motion.div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">Crop Type</label>
                <select className="w-full rounded-lg border bg-background px-4 py-2">
                  <option>All Crops</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Cotton</option>
                  <option>Maize</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">Location</label>
                <select className="w-full rounded-lg border bg-background px-4 py-2">
                  <option>All Locations</option>
                  <option>Punjab</option>
                  <option>Haryana</option>
                  <option>Gujarat</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">Price Range</label>
                <select className="w-full rounded-lg border bg-background px-4 py-2">
                  <option>Any Price</option>
                  <option>Under ₹50,000</option>
                  <option>₹50,000 - ₹75,000</option>
                  <option>Above ₹75,000</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">Sort By</label>
                <select className="w-full rounded-lg border bg-background px-4 py-2">
                  <option>Quality Score</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Harvest Date</option>
                </select>
              </div>
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
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group h-full overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-2xl font-bold">{listing.crop}</h3>
                        {listing.verified && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <Link 
                        to={`/farm/${listing.farmId}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {listing.farmName}
                      </Link>
                      <p className="text-xs text-muted-foreground">{listing.location}</p>
                    </div>
                    <Badge variant="outline">#{listing.farmId}</Badge>
                  </div>
                  
                  {/* Quality Stars */}
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(listing.quality / 20) ? 'fill-primary text-primary' : 'text-muted'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">Quality: {listing.quality}</span>
                  </div>
                  
                  {/* Predicted Yield */}
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="mb-1 text-xs text-muted-foreground">Predicted Yield</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">
                        {listing.predictedYield.value}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ±{listing.predictedYield.uncertainty} {listing.predictedYield.unit}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full bg-success"
                          style={{ width: `${listing.ndviScore * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">NDVI: {listing.ndviScore}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ₹{listing.totalPrice.toLocaleString()}
                      </span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ₹{listing.pricePerUnit.toLocaleString()}/{listing.unit}
                    </p>
                  </div>
                  
                  {/* Harvest Date */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Harvest: {new Date(listing.harvestDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {/* Offers */}
                  {listing.offers > 0 && (
                    <p className="mb-4 text-sm font-medium text-primary">
                      {listing.offers} active {listing.offers === 1 ? 'offer' : 'offers'}
                    </p>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Buy Now
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      Make Offer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Listings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropMarketplace;
