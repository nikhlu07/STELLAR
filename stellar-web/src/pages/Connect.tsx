
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Loader2,
  Sprout,
  DollarSign,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";

const Connect = () => {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  const [loading, setLoading] = useState(false);
  const [connectingUser, setConnectingUser] = useState<'farmer' | 'lender' | 'verifier' | null>(null);

  const handleConnect = (selectedUserType: "farmer" | "lender" | "verifier") => {
    setConnectingUser(selectedUserType);
    setLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      setUserType(selectedUserType);
      setLoading(false);
      toast.success("Wallet connected successfully! Welcome back.");
      if (selectedUserType === "farmer") {
        navigate("/farmer");
      } else if (selectedUserType === "lender") {
        navigate("/lender");
      } else {
        navigate("/verifier");
      }
    }, 1500);
  };

  return (
    <>
      <style>{`
        body {
            background-color: #FFFFFF;
            color: #1A1A2E;
            font-family: 'Space Mono', monospace;
            background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
        header.scrolled {
            background-color: rgba(255, 255, 255, 0.8);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .font-lufga {
            font-family: 'Lufga', sans-serif;
        }
        .electric-violet-text {
            color: #5C27FE;
        }
        .electric-violet-bg {
            background-color: #5C27FE;
        }
        .electric-violet-border {
            border-color: #5C27FE;
        }
        .glow-effect-soft {
             box-shadow: 0 0 15px rgba(92, 39, 254, 0.5);
        }
        .card-bg {
            background-color: #F9FAFB;
            border: 1px solid #E5E7EB;
        }
        .card-hover-effect {
            transition: all 0.3s ease-in-out;
        }
        .card-hover-effect:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 0 25px rgba(92, 39, 254, 0.4);
            border-color: #5C27FE !important;
        }
      `}</style>
      <div className="min-h-screen overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="/logo.svg" className="h-10 w-10" alt="Stellar Logo" />
                    <span className="font-lufga text-2xl font-bold text-gray-900 tracking-wider">STELLAR</span>
                </Link>
                <nav>
                    <Link to="/" className="hover:electric-violet-text transition-colors duration-300 font-lufga">Home</Link>
                </nav>
            </div>
        </header>

        <main className="pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h1 className="font-lufga text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight">
                  Join STELLAR Network
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Choose your role to get started.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 animate-fade-in">
                <Card
                  className="transition-all card-hover-effect"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <Sprout className="mb-4 h-16 w-16 electric-violet-text" />
                    <h3 className="mb-2 font-lufga text-2xl font-semibold">Farmer</h3>
                    <p className="text-gray-600">List crops, manage your farm, and secure <br/>funding.</p>
                    <Button
                      className="mt-6 electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft"
                      onClick={() => handleConnect("farmer")}
                      disabled={loading}
                    >
                      {loading && connectingUser === 'farmer' ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Connecting...</>
                      ) : (
                        <><Wallet className="mr-2 h-5 w-5" />Connect</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                <Card
                  className="transition-all card-hover-effect"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <DollarSign className="mb-4 h-16 w-16 electric-violet-text" />
                    <h3 className="mb-2 font-lufga text-2xl font-semibold">Lender</h3>
                    <p className="text-gray-600">Invest in agricultural ventures and earn returns.</p>
                     <Button
                      className="mt-6 electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft"
                      onClick={() => handleConnect("lender")}
                      disabled={loading}
                    >
                      {loading && connectingUser === 'lender' ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Connecting...</>
                      ) : (
                        <><Wallet className="mr-2 h-5 w-5" />Connect</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
                <Card
                  className="transition-all card-hover-effect"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <ShieldCheck className="mb-4 h-16 w-16 electric-violet-text" />
                    <h3 className="mb-2 font-lufga text-2xl font-semibold">Verifier</h3>
                    <p className="text-gray-600">Verify crop data and ensure platform integrity.</p>
                     <Button
                      className="mt-6 electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft"
                      onClick={() => handleConnect("verifier")}
                      disabled={loading}
                    >
                      {loading && connectingUser === 'verifier' ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Connecting...</>
                      ) : (
                        <><Wallet className="mr-2 h-5 w-5" />Connect</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Connect;
