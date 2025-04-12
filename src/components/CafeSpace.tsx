
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Coffee, Utensils, Wifi, Clock, Laptop } from 'lucide-react';

const CafeSpace = () => {
  const amenities = [
    { icon: Coffee, title: "Artisan Coffee", description: "Specialty brews crafted by skilled baristas" },
    { icon: Utensils, title: "Fresh Food", description: "Delicious meals and snacks made daily" },
    { icon: Wifi, title: "High-Speed WiFi", description: "Reliable connection for your coding sessions" },
    { icon: BookOpen, title: "Coding Library", description: "Algorithm books and resources to reference" },
    { icon: Clock, title: "Extended Hours", description: "Open daily from 7 AM to 11 PM" },
    { icon: Laptop, title: "Power Stations", description: "Outlets at every table for your devices" }
  ];

  return (
    <section id="cafe-space" className="py-16 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url(backgrounds/cubes.png)] opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 font-mono">SPACE TO CODE & CONNECT</Badge>
          <h2 className="text-3xl font-bold mb-4">A Cafe Designed for Coders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've created the perfect environment to enjoy great food and drinks while Leetcoding alone or with friends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url(/images/ppl.jpg)] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Cozy Atmosphere</h3>
              <p className="text-muted-foreground">Comfortable seating arranged for both social and focused work sessions.</p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url(/images/b.jpg)] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Community Tables</h3>
              <p className="text-muted-foreground">Large tables perfect for contest days and collaborative coding sessions.</p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url(/images/barista.jpg)] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Barista Bar</h3>
              <p className="text-muted-foreground">Watch our baristas craft the perfect drink to fuel your coding session.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {amenities.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:shadow-md hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-2 rounded-md bg-card">
                  <ItemIcon className="h-5 w-5 text-code-blue" />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CafeSpace;
