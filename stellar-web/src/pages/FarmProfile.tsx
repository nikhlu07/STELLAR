import { useParams, Link } from "react-router-dom";
import { Download, CheckCircle2, ExternalLink, TrendingUp, Star } from "lucide-react";
import Header from "@/components/Header";
import SatelliteMap from "@/components/SatelliteMap";
import NDVIChart from "@/components/NDVIChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockFarms } from "@/lib/mockData";
import { motion } from "framer-motion";

const FarmProfile = () => {
  const { id } = useParams();
  const farm = mockFarms.find(f => f.id === id) || mockFarms[0];

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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-lufga text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight">
                  {farm.name}
                </h1>
                <p className="mt-2 text-lg text-gray-600">{farm.location}</p>
              </div>
              <Button className="electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft gap-2">
                <Download className="h-4 w-4" />
                Download Verification
              </Button>
            </div>
          </motion.div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="card-bg card-hover-effect md:col-span-1">
              <CardHeader>
                <CardTitle className="font-lufga text-lg font-bold">Farm Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <p className="font-semibold">Intelligence Score</p>
                  <p className="font-lufga text-2xl font-bold electric-violet-text flex items-center gap-1">
                    <Star className="h-5 w-5" /> {farm.intelligenceScore}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <p className="font-semibold">NDVI Score</p>
                  <p className="font-lufga text-2xl font-bold text-green-600">{farm.ndviScore}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <p className="font-semibold">Area</p>
                  <p className="font-lufga text-xl font-bold">{farm.area}</p>
                </div>
                 <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
                  <p className="font-semibold">Current Crop</p>
                  <p className="font-lufga text-xl font-bold">{farm.crop}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 card-bg card-hover-effect overflow-hidden">
              <CardHeader>
                <CardTitle className="font-lufga text-xl font-bold">Farm Overview</CardTitle>
                <CardDescription className="text-gray-600">Real-time satellite view of {farm.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg overflow-hidden border-2 electric-violet-border">
                  <SatelliteMap 
                    center={[Number(farm.coordinates[0][0]), Number(farm.coordinates[0][1])]}
                    farmPolygon={farm.coordinates.map(coord => [Number(coord[0]), Number(coord[1])])}
                    farmName={farm.name}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8 card-bg card-hover-effect">
            <CardHeader>
              <CardTitle className="font-lufga text-xl font-bold">5-Year NDVI Timeline</CardTitle>
              <CardDescription className="text-gray-600">Satellite-tracked crop health and vegetation index</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <NDVIChart />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-sm text-gray-500">Current NDVI</p>
                  <p className="font-lufga text-2xl font-bold text-green-600">{farm.ndviScore}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-sm text-gray-500">5-Year Average</p>
                  <p className="font-lufga text-2xl font-bold">0.74</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-sm text-gray-500">Trend</p>
                  <p className="font-lufga text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-5 w-5" /> 8.2%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-xl font-bold">Verification History</CardTitle>
                <CardDescription className="text-gray-600">Trust Circle reports and on-chain records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farm.verifications.map((verification, idx) => (
                    <div key={idx} className="rounded-lg border bg-white p-4 transition-all hover:shadow-md">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-lufga font-semibold">{verification.trustCircle}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(verification.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <Badge variant="outline" className="gap-1.5 border-green-600 bg-green-50 text-green-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        <p className="break-all">Hash: {verification.hash}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {farm.loans.length > 0 && (
              <Card className="card-bg card-hover-effect">
                <CardHeader>
                  <CardTitle className="font-lufga text-xl font-bold">Loan History</CardTitle>
                  <CardDescription className="text-gray-600">Active and past credit lines for this farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {farm.loans.map((loan, idx) => (
                      <div key={idx} className="rounded-lg border bg-white p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <p className="font-lufga mb-1 text-2xl font-bold electric-violet-text">₹{loan.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              {loan.duration} • {new Date(loan.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={`${loan.status === 'active' ? 'electric-violet-bg' : 'bg-gray-400'} text-white`}>
                            {loan.status}
                          </Badge>
                        </div>
                        
                        <div>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="text-gray-500">Repaid</span>
                            <span className="font-semibold">₹{loan.repaid.toLocaleString()}</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div 
                              className="h-full bg-green-500 transition-all"
                              style={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmProfile;
