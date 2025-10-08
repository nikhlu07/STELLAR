import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockFarms } from "@/lib/mockData";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { celebrateSuccess } from "@/lib/confetti";

const SellCrop = () => {
  const navigate = useNavigate();
  const [selectedFarm, setSelectedFarm] = useState(mockFarms[0].id);
  const [cropType, setCropType] = useState("Wheat");
  const [harvestDate, setHarvestDate] = useState("");
  const [aiPrice, setAiPrice] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  
  const farm = mockFarms.find(f => f.id === selectedFarm) || mockFarms[0];
  
  const calculatePrice = () => {
    setCalculating(true);
    // Simulate AI calculation
    setTimeout(() => {
      const basePrice = cropType === "Wheat" ? 2100 : cropType === "Rice" ? 1900 : 5500;
      const qualityMultiplier = farm.ndviScore;
      const suggestedPrice = Math.round(basePrice * qualityMultiplier * 1.1);
      setAiPrice(suggestedPrice);
      setCalculating(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    celebrateSuccess();
    toast.success("Crop listing created successfully! 🎉");
    setTimeout(() => {
      navigate("/farmer");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-4xl font-bold">List Crop for Sale</h1>
          <p className="mb-8 text-muted-foreground">
            AI-powered pricing based on satellite data and market rates
          </p>
        </motion.div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Crop Details</CardTitle>
                <CardDescription>Select your verified farm and crop information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Farm */}
                  <div className="space-y-2">
                    <Label htmlFor="farm">Select Verified Farm</Label>
                    <select
                      id="farm"
                      value={selectedFarm}
                      onChange={(e) => setSelectedFarm(e.target.value)}
                      className="w-full rounded-lg border bg-background px-4 py-3"
                    >
                      {mockFarms.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name} - {f.area} ({f.location})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Crop Type */}
                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop Type</Label>
                    <select
                      id="crop"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full rounded-lg border bg-background px-4 py-3"
                    >
                      <option>Wheat</option>
                      <option>Rice</option>
                      <option>Cotton</option>
                      <option>Maize</option>
                      <option>Sugarcane</option>
                    </select>
                  </div>
                  
                  {/* Harvest Date */}
                  <div className="space-y-2">
                    <Label htmlFor="harvest">Expected Harvest Date</Label>
                    <Input
                      id="harvest"
                      type="date"
                      value={harvestDate}
                      onChange={(e) => setHarvestDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Calculate Price Button */}
                  <Button
                    type="button"
                    onClick={calculatePrice}
                    disabled={calculating || !harvestDate}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <Sparkles className={`h-4 w-4 ${calculating ? 'animate-spin' : ''}`} />
                    {calculating ? 'Calculating...' : 'Calculate AI Price'}
                  </Button>
                  
                  {/* AI Suggested Price */}
                  {aiPrice && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-lg border-2 border-primary/30 bg-primary/5 p-6"
                    >
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>AI-Suggested Price</span>
                      </div>
                      
                      <div className="mb-2 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">₹{aiPrice}</span>
                        <span className="text-muted-foreground">/quintal</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base market rate:</span>
                          <span className="font-medium">₹{cropType === "Wheat" ? "2,100" : cropType === "Rice" ? "1,900" : "5,500"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quality multiplier (NDVI):</span>
                          <span className="font-medium text-success">×{farm.ndviScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Farm intelligence bonus:</span>
                          <span className="font-medium">+10%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Adjust Price */}
                  {aiPrice && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Final Price per Quintal (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        defaultValue={aiPrice}
                        min={aiPrice * 0.8}
                        max={aiPrice * 1.2}
                      />
                      <p className="text-xs text-muted-foreground">
                        You can adjust ±20% from AI suggestion
                      </p>
                    </div>
                  )}
                  
                  {/* Submit */}
                  <Button 
                    type="submit" 
                    className="w-full gap-2" 
                    size="lg"
                    disabled={!aiPrice}
                  >
                    <TrendingUp className="h-4 w-4" />
                    List Crop on Marketplace
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Card */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Farm Preview</CardTitle>
                <CardDescription>Selected farm details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                  <h4 className="mb-2 font-bold">{farm.name}</h4>
                  <p className="text-sm text-muted-foreground">{farm.location}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-semibold">{farm.area}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Crop</p>
                    <p className="font-semibold">{farm.crop}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Intelligence</p>
                    <p className="font-semibold text-primary">{farm.intelligenceScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NDVI</p>
                    <p className="font-semibold text-success">{farm.ndviScore}</p>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-secondary/30 p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Verification Status</p>
                  <p className="font-semibold text-success">
                    ✓ Verified {farm.verifications.length}x
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last: {new Date(farm.verifications[0].date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCrop;
