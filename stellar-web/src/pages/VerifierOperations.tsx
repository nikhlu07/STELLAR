import { MapPin, IndianRupee, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockVerifierJobs, mockTrustCircle } from "@/lib/mockData";
import { motion } from "framer-motion";

const VerifierOperations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-4xl font-bold">Verifier Operations</h1>
          <p className="mb-8 text-muted-foreground">Available verification jobs in your area</p>
        </motion.div>
        
        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Reputation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">94</p>
              <p className="text-sm text-muted-foreground">Excellent standing</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹47,250</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Jobs Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">247</p>
              <p className="text-sm text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Stake Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹15,000</p>
              <p className="text-sm text-success">Locked</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Trust Circle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Trust Circle: {mockTrustCircle.id}
            </CardTitle>
            <CardDescription>Network of trusted verifiers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {mockTrustCircle.members.map((member, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-4 rounded-lg border bg-secondary/30 p-4"
                >
                  <div className="text-4xl">{member.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{member.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-3 w-3" />
                      <span>Reputation: {member.reputation}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Stake: ₹{member.stake.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/10 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Circle Stake</p>
                <p className="text-2xl font-bold text-primary">₹{mockTrustCircle.totalStake.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
                <p className="text-2xl font-bold">{mockTrustCircle.completedJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Available Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Available Verification Jobs</CardTitle>
            <CardDescription>Choose jobs based on distance and payout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVerifierJobs.map((job) => (
                <div 
                  key={job.id}
                  className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="mb-1 text-xl font-bold">{job.farmName}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location} • {job.distance}
                        </div>
                        <Badge variant={job.difficulty === "Easy" ? "secondary" : "default"}>
                          {job.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1 flex items-center gap-1 text-2xl font-bold text-primary">
                        <IndianRupee className="h-5 w-5" />
                        {job.payout.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Payout</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium">Required Tasks:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tasks.map((task, idx) => (
                        <Badge key={idx} variant="outline">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </p>
                    <Button className="gap-2">
                      Accept Job
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifierOperations;
