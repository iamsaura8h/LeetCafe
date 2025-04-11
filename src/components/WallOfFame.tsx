
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { leaderboard } from '@/data/wallOfFame';
import { Award, Flame, Trophy } from 'lucide-react';

const WallOfFame = () => {
  return (
    <section id="wall-of-fame" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Wall of Fame</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our legendary LeetCoders with 1000+ day streaks. Will you be the next to join them?
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaderboard.map((coder) => (
            <Card key={coder.id} className="bg-card border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-accent/20 hover:-translate-y-1">
              <div className="p-1 bg-gradient-to-r from-code-blue via-code-purple to-code-pink"></div>
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={coder.profileImage} 
                      alt={coder.name}
                      className="rounded-full h-16 w-16 object-cover border-2 border-border" 
                    />
                    {coder.id <= 3 && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-card border border-border">
                        <Trophy 
                          className={`h-4 w-4 ${
                            coder.id === 1 
                              ? 'text-yellow-500' 
                              : coder.id === 2 
                              ? 'text-gray-300' 
                              : 'text-amber-700'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold">{coder.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono">@{coder.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="h-5 w-5 text-code-orange" />
                  <div className="font-mono font-bold text-lg">{coder.streak}</div>
                  <span className="text-sm text-muted-foreground">day streak</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {coder.badges.map((badge, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      <Award className="h-3 w-3" />
                      <span className="text-xs">{badge}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfFame;
