
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Coffee, Laptop, Users } from 'lucide-react';
import BinaryPassword from './BinaryPassword';

const Hero = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium font-mono">
              <Coffee className="h-4 w-4 text-code-blue" />
              <span>Opening April 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Where <span className="text-code-blue font-mono">Leetcoders</span> gather to solve & socialize
            </h1>
            
            <p className="text-lg text-muted-foreground">
              A unique cafe experience for competitive programmers. Join weekly and biweekly contests, 
              solve our Problem of the Day for discounts, and maybe earn your spot on our Wall of Fame.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-code-blue hover:bg-code-blue/80">
                View Today's Problem <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                Explore Menu
              </Button>
            </div>
            
            <div className="pt-6 grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-code-blue" />
                  <span className="text-xl font-bold">1000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Leetcoders</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-code-green" />
                  <span className="text-xl font-bold">Weekly</span>
                </div>
                <p className="text-sm text-muted-foreground">Contests</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Laptop className="h-5 w-5 text-code-purple" />
                  <span className="text-xl font-bold">365</span>
                </div>
                <p className="text-sm text-muted-foreground">Problems/Year</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
              <div className="bg-secondary rounded-md p-4 mb-6">
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-code-orange"></div>
                  <div className="w-3 h-3 rounded-full bg-code-green"></div>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <p><span className="text-code-purple">function</span> <span className="text-code-blue">welcomeToLeetCafe</span>() {'{'}</p>
                  <p className="pl-4"><span className="text-code-purple">const</span> coffee = <span className="text-code-green">"freshly brewed"</span>;</p>
                  <p className="pl-4"><span className="text-code-purple">const</span> brain = <span className="text-code-green">"ready to solve"</span>;</p>
                  <p className="pl-4"><span className="text-code-purple">return</span> {'{'}problem, coffee, community{'}'}</p>
                  <p>{'}'}</p>
                </div>
              </div>
              
              <h3 className="font-mono text-lg font-bold mb-2">WiFi Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-mono">LeetCafe_5GHz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Password:</span>
                  <BinaryPassword word="leetcode" />
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-accent/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
