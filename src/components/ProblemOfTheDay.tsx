
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Code, ExternalLink, Coffee, Users, Trophy } from 'lucide-react';

const ProblemOfTheDay = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const difference = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ hours, minutes, seconds });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const solvedToday = [
    { name: "Alex C.", major: "CS", time: "12:45 PM", avatar: "A" },
    { name: "Jamie T.", major: "SE", time: "01:30 PM", avatar: "J" },
    { name: "Morgan K.", major: "DS", time: "02:15 PM", avatar: "M" },
  ];
  
  return (
    <section id="problem" className="py-16 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 font-mono">DAILY CHALLENGE</Badge>
          <h2 className="text-3xl font-bold mb-4">Problem of the Day</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit LeetCafe, solve today's problem, and get <span className="text-amber-500 font-bold">15% off</span> your order. Connect with fellow students who've already cracked it!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-border bg-secondary h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-mono">Two Sum</CardTitle>
                    <CardDescription>Array, Hash Table</CardDescription>
                  </div>
                  <Badge className="bg-code-green">Easy</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p>
                  Given an array of integers <code className="bg-background px-1 rounded text-code-blue">nums</code> and an integer <code className="bg-background px-1 rounded text-code-blue">target</code>, return indices of the two numbers such that they add up to <code className="bg-background px-1 rounded text-code-blue">target</code>.
                </p>
                
                <p>
                  You may assume that each input would have exactly one solution, and you may not use the same element twice.
                </p>
                
                <div className="bg-background rounded-md p-4 font-mono text-sm space-y-3">
                  <p className="syntax-comment">// Example 1:</p>
                  <p><span className="syntax-keyword">Input:</span> nums = [2,7,11,15], target = 9</p>
                  <p><span className="syntax-keyword">Output:</span> [0,1]</p>
                  <p><span className="syntax-keyword">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                </div>
                
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4 mt-4">
                  <div className="flex items-center gap-3 text-amber-500 mb-2">
                    <Coffee className="h-5 w-5" />
                    <h4 className="font-bold">Student Special</h4>
                  </div>
                  <p className="text-sm">
                    Solve this problem while at our café and show your solution to a barista to receive 15% off your order! Ask about our weekly group solving sessions.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Next problem in:</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="font-mono text-sm">
                        {String(countdown.hours).padStart(2, '0')}:
                        {String(countdown.minutes).padStart(2, '0')}:
                        {String(countdown.seconds).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Code className="h-4 w-4" /> Solution
                  </Button>
                  <Button className="bg-code-blue hover:bg-code-blue/80 gap-2">
                    Solve on LeetCode <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="border-border bg-secondary h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Today's Solvers
                </CardTitle>
                <CardDescription>Students who solved today's problem</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {solvedToday.map((student, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-md border border-border">
                      <div className="h-10 w-10 rounded-full bg-amber-500/80 flex items-center justify-center text-white font-bold">
                        {student.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-between">
                          <span>{student.major}</span>
                          <span>{student.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-amber-500/10 rounded-md border border-amber-500/20">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-amber-500" />
                      Upcoming Group Session
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join fellow students to solve tomorrow's problem together!
                    </p>
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span>When:</span>
                        <span className="font-medium">Tomorrow, 5 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Where:</span>
                        <span className="font-medium">Community Table #3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <Users className="h-4 w-4" /> Join a Study Group
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemOfTheDay;
