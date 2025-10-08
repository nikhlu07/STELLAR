import { useParams, Link } from "react-router-dom";
import { Download, CheckCircle2, ExternalLink } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-4xl font-bold">{farm.name}</h1>
                <Badge className="violet-glow">NFT #{farm.id}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{farm.location}</p>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Verification Package
            </Button>
          </div>
        </motion.div>
        
        {/* NFT Card Display */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="relative h-[300px] bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_70%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">STELLAR Farm NFT</p>
                  <h3 className="mb-1 text-3xl font-bold">{farm.name}</h3>
                  <p className="text-muted-foreground">{farm.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Intelligence Score</p>
                    <p className="text-3xl font-bold text-primary">{farm.intelligenceScore}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NDVI Score</p>
                    <p className="text-3xl font-bold text-success">{farm.ndviScore}</p>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Area</p>
                  <p className="font-semibold">{farm.area}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Crop Type</p>
                  <p className="font-semibold">{farm.crop}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Verifications</p>
                  <p className="font-semibold">{farm.verifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Satellite Map */}
          <Card>
            <CardHeader>
              <CardTitle>Satellite View</CardTitle>
              <CardDescription>Real-time farm boundary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <SatelliteMap 
                  center={[Number(farm.coordinates[0][0]), Number(farm.coordinates[0][1])]}
                  farmPolygon={farm.coordinates.map(coord => [Number(coord[0]), Number(coord[1])])}
                  farmName={farm.name}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* NDVI Satellite Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5-Year NDVI Timeline</CardTitle>
            <CardDescription>Satellite-tracked crop health and vegetation index</CardDescription>
          </CardHeader>
          <CardContent>
            <NDVIChart />
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border bg-secondary/30 p-3 text-center">
                <p className="text-muted-foreground">Current NDVI</p>
                <p className="text-2xl font-bold text-success">{farm.ndviScore}</p>
              </div>
              <div className="rounded-lg border bg-secondary/30 p-3 text-center">
                <p className="text-muted-foreground">5-Year Average</p>
                <p className="text-2xl font-bold">0.74</p>
              </div>
              <div className="rounded-lg border bg-secondary/30 p-3 text-center">
                <p className="text-muted-foreground">Trend</p>
                <p className="text-2xl font-bold text-success">↑ 8.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Verification History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>Trust Circle reports and timestamps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {farm.verifications.map((verification, idx) => (
                <div key={idx} className="relative flex gap-6">
                  {/* Timeline Line */}
                  {idx !== farm.verifications.length - 1 && (
                    <div className="absolute left-[15px] top-8 h-full w-0.5 bg-primary/30" />
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary violet-glow">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 rounded-lg border bg-secondary/30 p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{verification.trustCircle}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(verification.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        CTC-0 Sealed
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <p className="mb-1 text-sm font-medium">Verified by:</p>
                      <div className="flex flex-wrap gap-2">
                        {verification.members.map((member, mIdx) => (
                          <Badge key={mIdx} variant="secondary">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="rounded bg-background p-2">
                      <p className="mb-1 text-xs text-muted-foreground">Transaction Hash</p>
                      <p className="font-mono text-xs break-all">{verification.hash}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Loan History */}
        {farm.loans.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Loan History</CardTitle>
              <CardDescription>Active and past credit lines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farm.loans.map((loan, idx) => (
                  <div key={idx} className="rounded-lg border bg-card p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="mb-1 text-2xl font-bold">₹{loan.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {loan.duration} • Issued {new Date(loan.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={loan.status === 'active' ? 'bg-success' : ''}>
                        {loan.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Repaid</span>
                        <span className="font-semibold">₹{loan.repaid.toLocaleString()}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <div 
                          className="h-full bg-success transition-all"
                          style={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Remaining</span>
                        <span className="font-semibold">₹{(loan.amount - loan.repaid).toLocaleString()}</span>
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
  );
};

export default FarmProfile;
