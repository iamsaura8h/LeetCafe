
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Code, ExternalLink } from 'lucide-react';

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
  
  return (
    <section id="problem" className="py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Problem of the Day</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Solve today's problem at the cafe and get 15% off your order. New problem drops daily at midnight.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto border-border bg-card">
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
              Given an array of integers <code className="bg-secondary px-1 rounded text-code-blue">nums</code> and an integer <code className="bg-secondary px-1 rounded text-code-blue">target</code>, return indices of the two numbers such that they add up to <code className="bg-secondary px-1 rounded text-code-blue">target</code>.
            </p>
            
            <p>
              You may assume that each input would have exactly one solution, and you may not use the same element twice.
            </p>
            
            <div className="bg-secondary rounded-md p-4 font-mono text-sm space-y-3">
              <p className="syntax-comment">// Example 1:</p>
              <p><span className="syntax-keyword">Input:</span> nums = [2,7,11,15], target = 9</p>
              <p><span className="syntax-keyword">Output:</span> [0,1]</p>
              <p><span className="syntax-keyword">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Next problem in:</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-code-blue" />
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
    </section>
  );
};

export default ProblemOfTheDay;
