
import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Flame, Trophy } from 'lucide-react';

interface Coder {
  id: number;
  name: string;
  username: string;
  streak: number;
  profileImage: string;
  badges: string[];
}

const LeetPool = () => {
  const [leaderboard, setLeaderboard] = useState<Coder[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from your API
    // For demo, we'll combine saved users with our existing leaderboard
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Map users to the leaderboard format and add to existing data
    const userCoders = users.map((user: any, index: number) => ({
      id: 1000 + index, // Start IDs after our predefined ones
      name: user.name,
      username: user.username,
      streak: user.streak || Math.floor(Math.random() * 50), // Random streak if not set
      profileImage: `https://avatars.dicebear.com/api/initials/${user.username}.svg`, // Generate avatar from username
      badges: ["New Member", "Learning Path"]
    }));
    
    // Combine with existing leaderboard data from predefined list
    // In a real app, you would fetch this from your backend
    const predefinedCoders: Coder[] = [
      {
        id: 1,
        name: "Alex Chen",
        username: "algomaster",
        streak: 1562,
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        badges: ["Contest Winner", "Hard Problem Expert"]
      },
      {
        id: 2,
        name: "Sarah Johnson",
        username: "codequeen",
        streak: 1487,
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
        badges: ["Dynamic Programming Guru", "Weekly Contest Champion"]
      },
      {
        id: 3,
        name: "Raj Patel",
        username: "leetcode_ninja",
        streak: 1435,
        profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
        badges: ["Graph Theory Expert", "1000+ Problems Solved"]
      },
      {
        id: 4,
        name: "Emily Zhang",
        username: "algoprincess",
        streak: 1388,
        profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
        badges: ["BFS/DFS Master", "Top Contributor"]
      }
    ];
    
    // Combine and sort by streak
    const allCoders = [...predefinedCoders, ...userCoders]
      .sort((a, b) => b.streak - a.streak);
    
    setLeaderboard(allCoders);
  }, []);

  return (
    <section id="leetpool" className="py-16 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 font-mono">CODER COMMUNITY</Badge>
          <h2 className="text-3xl font-bold mb-4">LeetPool</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our legendary LeetCoders competing for the top spots. Join the cafe and get on the board!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaderboard.map((coder) => (
            <Card key={coder.id} className="bg-card border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-accent/20 hover:-translate-y-1">
              <div className="p-1 bg-gradient-to-r from-amber-500 via-code-blue to-code-purple"></div>
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
                  <Flame className="h-5 w-5 text-amber-500" />
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

export default LeetPool;
