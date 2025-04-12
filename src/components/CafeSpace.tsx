
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Coffee, Utensils, Wifi, Clock, Laptop, Users, Calendar, GraduationCap, Sparkles } from 'lucide-react';

const CafeSpace = () => {
  const amenities = [
    { icon: Coffee, title: "Student Brews", description: "Special discounts for students with valid ID" },
    { icon: Users, title: "Community Tables", description: "Designed for group studying and pair programming" },
    { icon: Wifi, title: "High-Speed WiFi", description: "Reliable connection for your coding sessions" },
    { icon: BookOpen, title: "Resource Library", description: "Textbooks and reference materials to borrow" },
    { icon: GraduationCap, title: "Mentorship", description: "Senior students available to help with coding problems" },
    { icon: Calendar, title: "Study Groups", description: "Organized weekly meetups for different courses" }
  ];

  return (
    <section id="cafe-space" className="py-16 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 font-mono">YOUR CAMPUS CODING HUB</Badge>
          <h2 className="text-3xl font-bold mb-4">Where Students Connect & Code</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            LeetCafe is more than just coffee—it's a space designed for students to connect, collaborate, and code together in a supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Study Together</h3>
              <p className="text-muted-foreground">A dedicated space for collaborative study sessions and coding meetups between classes.</p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Campus Community</h3>
              <p className="text-muted-foreground">Meet students from different departments united by a passion for programming and technology.</p>
            </CardContent>
          </Card>

          <Card className="border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
            <div className="h-64 bg-[url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2">Café Perks</h3>
              <p className="text-muted-foreground">Solve our daily coding challenges for discounts on your favorite drinks and snacks.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <Badge className="bg-amber-500 text-white mb-2">STUDENT TESTIMONIALS</Badge>
            <h3 className="text-2xl font-bold">What the Community Says</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <div className="text-amber-500">★★★★★</div>
              </div>
              <p className="italic mb-4">"LeetCafe helped me find my study group for Algorithm Design. Now we meet weekly and our grades have improved significantly!"</p>
              <div className="font-bold">Mia, Computer Science</div>
            </div>
            
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <div className="text-amber-500">★★★★★</div>
              </div>
              <p className="italic mb-4">"Solving the problem of the day has become our daily ritual. Great coffee, better friends, and I'm getting better at coding!"</p>
              <div className="font-bold">Jake, Software Engineering</div>
            </div>
            
            <div className="p-6 bg-secondary rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <div className="text-amber-500">★★★★★</div>
              </div>
              <p className="italic mb-4">"I met my internship referral at LeetCafe! We were pair programming for a class project and now we work at the same company."</p>
              <div className="font-bold">Sara, Data Science</div>
            </div>
          </div>
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
