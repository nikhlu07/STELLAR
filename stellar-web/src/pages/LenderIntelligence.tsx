import { TrendingUp, TrendingDown, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockFarms } from "@/lib/mockData";
import { motion } from "framer-motion";
import IntelligenceGauge from "@/components/IntelligenceGauge";

const LenderIntelligence = () => {
  const totalDeployed = mockFarms.reduce((sum, farm) => sum + farm.creditUsed, 0);
  const activeLoans = mockFarms.filter(f => f.loans.length > 0).length;
  const avgScore = Math.round(mockFarms.reduce((sum, farm) => sum + farm.intelligenceScore, 0) / mockFarms.length);
  
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
              Lender <span className="electric-violet-text">Intelligence</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">Portfolio overview and investment opportunities.</p>
          </motion.div>
          
          {/* Portfolio Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Total Deployed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="font-lufga text-3xl font-bold">₹{totalDeployed.toLocaleString()}</p>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-green-500">+12.3% this month</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Active Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold">{activeLoans}</p>
                <p className="text-sm text-gray-500">Across {mockFarms.length} farms</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Default Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <p className="font-lufga text-3xl font-bold text-green-500">1.6%</p>
                  <TrendingDown className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-500">Industry avg: 8.2%</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Avg Intelligence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold electric-violet-text">{avgScore}</p>
                <p className="text-sm text-gray-500">High quality portfolio</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Farm NFT Marketplace */}
          <Card className="card-bg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-lufga text-xl font-bold">Farm Investment Opportunities</CardTitle>
                <CardDescription className="text-gray-600">Verified farms seeking capital investment.</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="bg-white border-gray-300 text-gray-700 gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockFarms.map((farm) => (
                  <motion.div
                    key={farm.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl border bg-white overflow-hidden transition-all card-hover-effect"
                  >
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h4 className="font-lufga mb-1 text-lg font-bold">{farm.name}</h4>
                          <p className="text-sm text-gray-500">{farm.location}</p>
                        </div>
                        <Badge variant="outline" className="electric-violet-border electric-violet-text font-mono">
                          #{farm.id}
                        </Badge>
                      </div>
                      
                      <div className="mb-6 flex items-center justify-center">
                        <IntelligenceGauge score={farm.intelligenceScore} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Area</p>
                          <p className="font-lufga font-semibold">{farm.area}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Crop</p>
                          <p className="font-lufga font-semibold">{farm.crop}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">NDVI</p>
                          <p className="font-lufga font-semibold text-green-600">{farm.ndviScore}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Verified</p>
                          <p className="font-lufga font-semibold">{farm.verifications.length}x</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border-t p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Credit Available</span>
                        <span className="font-lufga font-bold">₹{(farm.creditLine - farm.creditUsed).toLocaleString()}</span>
                      </div>
                      <div className="flex gap-3">
                        <Button asChild variant="outline" className="flex-1 bg-white font-bold">
                          <Link to={`/farm/${farm.id}`}>View Details</Link>
                        </Button>
                        <Button className="flex-1 electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft">
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
    </>
  );
};

export default LenderIntelligence;
