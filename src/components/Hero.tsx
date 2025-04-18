
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Coffee, Laptop, Utensils } from 'lucide-react';
import BinaryPassword from './BinaryPassword';

const Hero = () => {

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-[url(/backgrounds/bb.jpg)] 
        bg-cover bg-center bg-fixed"
        style={{ 
          opacity: 0.7,
        }}
      ></div>
      
      <div className="absolute inset-90 bg-gradient-to-b from-background/10 to-background/20"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium font-mono">
              <Coffee className="h-4 w-4 text-amber-500" />
              <span>Opening April 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A <span className="text-amber-500">Café</span> where <span className="text-code-blue font-mono">code</span> meets coffee
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Enjoy artisanal coffee and delicious food in a space designed for programmers. 
              Solve our Problem of the Day for discounts, participate in coding events, and connect with fellow developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
              onClick={() => scrollToSection("menu")}
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all hover:scale-105 duration-300">
                View Our Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" 
              onClick={() => scrollToSection("problem")}
              className="hover:scale-105 transition-all duration-300">
                Today's Problem
              </Button>
            </div>
            
            <div className="pt-6 grid grid-cols-3 gap-6">
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-amber-500" />
                  <span className="text-xl font-bold">Artisan</span>
                </div>
                <p className="text-sm text-muted-foreground">Coffee & Tea</p>
              </div>
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-amber-600" />
                  <span className="text-xl font-bold">Fresh</span>
                </div>
                <p className="text-sm text-muted-foreground">Local Food</p>
              </div>
              <div className="space-y-1 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-code-blue" />
                  <span className="text-xl font-bold">Weekly</span>
                </div>
                <p className="text-sm text-muted-foreground">Code Events</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Coffee className="h-6 w-6 text-amber-500" />
                  Today's Special
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Limited Time</Badge>
              </div>
              
              <div className="bg-secondary rounded-md p-4 mb-6 hover:scale-105 transition-all duration-300">
                {/* <div className="absolute -right-4 -top-4 w-24 h-24 bg-[url(/images/cafe.jpeg)] bg-cover bg-center rounded-full border-4 border-card shadow-lg"></div> */}
                <h3 className="font-bold mb-2">Signature Hot Coffee</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our signature coffee with layers of chocolate that seem to go on forever, topped with a binary pattern in the foam.
                </p>
                <div className="text-xl font-mono font-bold text-amber-500">₹159</div>
              </div>
              
              <h3 className="font-mono text-lg font-bold mb-2">WiFi Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between md:mr-16 text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-mono">LeetCafe_5GHz</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Password:</span>
                  <div className="max-w-[150px] md:mr-10">
                    <BinaryPassword word="solve" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-amber-600/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
