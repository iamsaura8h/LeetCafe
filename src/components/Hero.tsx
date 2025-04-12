
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Coffee, Laptop, Utensils, Users, BookOpen } from 'lucide-react';
import BinaryPassword from './BinaryPassword';

const Hero = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] 
        bg-cover bg-center bg-fixed"
        style={{ 
          opacity: 0.15,
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium font-mono">
              <Coffee className="h-4 w-4 text-amber-500" />
              <span>On-Campus Since 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Where <span className="text-amber-500">campus</span> coders <span className="text-code-blue font-mono">connect</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              More than just a café—we're a coding community for students. Find study partners, 
              join collaborative coding sessions, and make friends who speak your programming language.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white transition-all hover:scale-105 duration-300">
                View Our Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-all duration-300">
                Today's Problem
              </Button>
            </div>
            
            <div className="pt-6 grid grid-cols-3 gap-6">
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <span className="text-xl font-bold">Student</span>
                </div>
                <p className="text-sm text-muted-foreground">Community</p>
              </div>
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                  <span className="text-xl font-bold">Study</span>
                </div>
                <p className="text-sm text-muted-foreground">Groups</p>
              </div>
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-code-blue" />
                  <span className="text-xl font-bold">Coding</span>
                </div>
                <p className="text-sm text-muted-foreground">Challenges</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Coffee className="h-6 w-6 text-amber-500" />
                  Campus Highlight
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Student Discount</Badge>
              </div>
              
              <div className="bg-secondary rounded-md p-4 mb-6 hover:scale-105 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1504627298427-d341f1f7454d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80')] bg-cover bg-center rounded-full border-4 border-card shadow-lg"></div>
                <h3 className="font-bold mb-2">Recursive Mocha</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our signature espresso with layers of chocolate, topped with a binary pattern in the foam. Solve today's challenge for 15% off!
                </p>
                <div className="text-xl font-mono font-bold text-amber-500">$4.95</div>
              </div>
              
              <div className="bg-amber-500/5 p-4 rounded-md border border-amber-500/10">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500" />
                  Community Events
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Algorithm Study Group</span>
                    <span className="text-muted-foreground">Tuesdays @ 7PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Web Dev Workshop</span>
                    <span className="text-muted-foreground">Thursdays @ 6PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Weekend Hackathon</span>
                    <span className="text-muted-foreground">April 19-21</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-amber-500/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
