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
        .form-select {
            background-color: white;
            border: 1px solid var(--border-gray);
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            width: 100%;
            transition: border-color 0.2s;
        }
        .form-select:focus {
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
              Sell Your <span className="electric-violet-text">Harvest</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">AI-powered pricing based on satellite data and market rates.</p>
          </motion.div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-bg">
                <CardHeader>
                  <CardTitle className="font-lufga text-xl font-bold">Crop Details</CardTitle>
                  <CardDescription className="text-gray-600">Select your verified farm and crop information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Select Farm */}
                    <div className="space-y-2">
                      <Label htmlFor="farm" className="font-lufga font-medium">Select Verified Farm</Label>
                      <select
                        id="farm"
                        value={selectedFarm}
                        onChange={(e) => setSelectedFarm(e.target.value)}
                        className="form-select font-lufga"
                      >
                        {mockFarms.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} - {f.area} ({f.location})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Crop Type & Harvest Date */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="crop" className="font-lufga font-medium">Crop Type</Label>
                        <select
                          id="crop"
                          value={cropType}
                          onChange={(e) => setCropType(e.target.value)}
                          className="form-select font-lufga"
                        >
                          <option>Wheat</option>
                          <option>Rice</option>
                          <option>Cotton</option>
                          <option>Maize</option>
                          <option>Sugarcane</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="harvest" className="font-lufga font-medium">Expected Harvest Date</Label>
                        <Input
                          id="harvest"
                          type="date"
                          value={harvestDate}
                          onChange={(e) => setHarvestDate(e.target.value)}
                          required
                          className="bg-white border-gray-300"
                        />
                      </div>
                    </div>
                    
                    {/* Calculate Price Button */}
                    <Button
                      type="button"
                      onClick={calculatePrice}
                      disabled={calculating || !harvestDate}
                      className="w-full gap-2 electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft"
                      size="lg"
                    >
                      <Sparkles className={`h-5 w-5 ${calculating ? 'animate-spin' : ''}`} />
                      {calculating ? 'Calculating...' : 'Calculate AI Optimal Price'}
                    </Button>
                    
                    {/* AI Suggested Price */}
                    {aiPrice && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl border-2 electric-violet-border bg-white p-6"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <Sparkles className="h-6 w-6 electric-violet-text" />
                          <span className="font-lufga text-lg font-bold electric-violet-text">AI-Suggested Price</span>
                        </div>
                        
                        <div className="mb-4 flex items-baseline gap-2">
                          <span className="font-lufga text-5xl font-bold text-black">₹{aiPrice.toLocaleString()}</span>
                          <span className="text-gray-500">/ quintal</span>
                        </div>
                        
                        <div className="space-y-2 text-sm font-lufga">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Base market rate:</span>
                            <span className="font-semibold">₹{cropType === "Wheat" ? "2,100" : cropType === "Rice" ? "1,900" : "5,500"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Quality Multiplier (NDVI):</span>
                            <span className="font-semibold text-green-600">×{farm.ndviScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Farm Intelligence Bonus:</span>
                            <span className="font-semibold text-green-600">+10%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Adjust Price & Submit */}
                    {aiPrice && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="price" className="font-lufga font-medium">Final Listing Price per Quintal (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            defaultValue={aiPrice}
                            min={aiPrice * 0.8}
                            max={aiPrice * 1.2}
                            className="bg-white border-gray-300 text-lg"
                          />
                          <p className="text-xs text-gray-500">
                            You can adjust ±20% from the AI suggestion.
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full gap-2 electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft"
                          size="lg"
                        >
                          <TrendingUp className="h-5 w-5" />
                          List Crop on Marketplace
                        </Button>
                      </>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Preview Card */}
            <div className="sticky top-24 self-start">
              <Card className="card-bg card-hover-effect">
                <CardHeader>
                  <CardTitle className="font-lufga text-lg font-bold">Farm Preview</CardTitle>
                  <CardDescription className="text-gray-600">Details of the selected farm.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-white p-4 border border-gray-200">
                    <h4 className="font-lufga mb-1 text-md font-bold">{farm.name}</h4>
                    <p className="text-sm text-gray-500">{farm.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Area</p>
                      <p className="font-lufga font-semibold">{farm.area}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Current Crop</p>
                      <p className="font-lufga font-semibold">{farm.crop}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Intelligence</p>
                      <p className="font-lufga font-semibold electric-violet-text">{farm.intelligenceScore}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">NDVI</p>
                      <p className="font-lufga font-semibold text-green-600">{farm.ndviScore}</p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
                    <p className="font-lufga font-semibold text-green-800">
                      ✓ Verified {farm.verifications.length}x
                    </p>
                    <p className="text-xs text-green-600">
                      Last on {new Date(farm.verifications[0].date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellCrop;
