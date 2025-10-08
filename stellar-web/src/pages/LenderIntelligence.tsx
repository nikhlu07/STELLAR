import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockFarms } from "@/lib/mockData";
import { motion } from "framer-motion";

const LenderIntelligence = () => {
  const totalDeployed = mockFarms.reduce((sum, farm) => sum + farm.creditUsed, 0);
  const activeLoans = mockFarms.filter(f => f.loans.length > 0).length;
  const avgScore = Math.round(mockFarms.reduce((sum, farm) => sum + farm.intelligenceScore, 0) / mockFarms.length);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-4xl font-bold">Lender Intelligence</h1>
          <p className="mb-8 text-muted-foreground">Portfolio overview and investment opportunities</p>
        </motion.div>
        
        {/* Portfolio Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Deployed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">₹{totalDeployed.toLocaleString()}</p>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <p className="text-sm text-success">+12.3% this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeLoans}</p>
              <p className="text-sm text-muted-foreground">Across {mockFarms.length} farms</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Default Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-success">1.6%</p>
                <TrendingDown className="h-5 w-5 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">Industry avg: 8.2%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Intelligence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{avgScore}</p>
              <p className="text-sm text-muted-foreground">High quality portfolio</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Farm NFT Marketplace */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Farm NFT Marketplace</CardTitle>
              <CardDescription>Verified farms seeking capital</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border bg-background px-3 py-2 text-sm">
                <option>All Crops</option>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Cotton</option>
              </select>
              <select className="rounded-lg border bg-background px-3 py-2 text-sm">
                <option>Score: High to Low</option>
                <option>Score: Low to High</option>
                <option>Area: Largest</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockFarms.map((farm) => (
                <motion.div
                  key={farm.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group rounded-lg border bg-card overflow-hidden transition-all hover:shadow-xl"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h4 className="mb-1 text-lg font-bold">{farm.name}</h4>
                        <p className="text-sm text-muted-foreground">{farm.location}</p>
                      </div>
                      <Badge className="violet-glow">
                        #{farm.id}
                      </Badge>
                    </div>
                    
                    <div className="mb-4 flex items-center justify-center">
                      <div className="relative h-24 w-24">
                        <svg className="h-full w-full -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="hsl(var(--muted))"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="36"
                            stroke="hsl(var(--primary))"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${(farm.intelligenceScore / 1000) * 226} 226`}
                            className="violet-glow"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{farm.intelligenceScore}</span>
                          <span className="text-xs text-muted-foreground">Score</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Area</p>
                        <p className="font-semibold">{farm.area}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Crop</p>
                        <p className="font-semibold">{farm.crop}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">NDVI</p>
                        <p className="font-semibold text-success">{farm.ndviScore}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Verified</p>
                        <p className="font-semibold">{farm.verifications.length}x</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credit Available</span>
                      <span className="font-bold">₹{(farm.creditLine - farm.creditUsed).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" className="flex-1" size="sm">
                        <Link to={`/farm/${farm.id}`}>View Details</Link>
                      </Button>
                      <Button className="flex-1" size="sm">
                        Deploy Capital
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LenderIntelligence;
