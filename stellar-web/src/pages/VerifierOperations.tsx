import { MapPin, IndianRupee, Award, Users, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockVerifierJobs, mockTrustCircle } from "@/lib/mockData";
import { motion } from "framer-motion";

const VerifierOperations = () => {
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
              Verifier <span className="electric-violet-text">Operations</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">Available verification jobs and network status.</p>
          </motion.div>
          
          {/* Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Reputation Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold electric-violet-text">94</p>
                <p className="text-sm text-gray-500">Excellent standing</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold">₹47,250</p>
                <p className="text-sm text-gray-500">This month</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Jobs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold">247</p>
                <p className="text-sm text-gray-500">All time</p>
              </CardContent>
            </Card>
            
            <Card className="card-bg card-hover-effect">
              <CardHeader>
                <CardTitle className="font-lufga text-sm font-medium text-gray-500">Stake Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-lufga text-3xl font-bold">₹15,000</p>
                <p className="text-sm text-green-500">Locked</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Trust Circle */}
          <Card className="card-bg mb-8">
            <CardHeader>
              <CardTitle className="font-lufga flex items-center gap-2 text-xl font-bold">
                <Users className="h-5 w-5" />
                Your Trust Circle
              </CardTitle>
              <CardDescription className="text-gray-600">Network of trusted verifiers ({mockTrustCircle.id})</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockTrustCircle.members.map((member, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 rounded-lg border bg-white p-4"
                  >
                    <div className="text-4xl">{member.avatar}</div>
                    <div className="flex-1">
                      <p className="font-lufga font-semibold">{member.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Award className="h-4 w-4" />
                        <span>Reputation: {member.reputation}</span>
                      </div>
                      <p className="text-sm text-gray-500">Stake: ₹{member.stake.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg electric-violet-bg/10 p-4">
                <div>
                  <p className="text-sm text-gray-500">Total Circle Stake</p>
                  <p className="font-lufga text-2xl font-bold electric-violet-text">₹{mockTrustCircle.totalStake.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jobs Completed</p>
                  <p className="font-lufga text-2xl font-bold">{mockTrustCircle.completedJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Available Jobs */}
          <Card className="card-bg">
            <CardHeader>
              <CardTitle className="font-lufga text-xl font-bold">Available Verification Jobs</CardTitle>
              <CardDescription className="text-gray-600">Choose jobs based on distance and payout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVerifierJobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl border bg-white p-6 transition-all card-hover-effect"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h4 className="font-lufga mb-1 text-xl font-bold">{job.farmName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location} • {job.distance}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-1 flex items-center justify-end gap-1 text-2xl font-bold electric-violet-text">
                          <IndianRupee className="h-5 w-5" />
                          {job.payout.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">Payout</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="mb-2 text-sm font-medium">Required Tasks:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.tasks.map((task, idx) => (
                          <Badge key={idx} variant="outline" className="font-mono">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </p>
                      <Button className="electric-violet-bg text-white font-bold hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 glow-effect-soft gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Accept Job
                      </Button>
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

export default VerifierOperations;
