
import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Flame, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Coder {
  id: number | string;
  name: string;
  username: string;
  streak: number;
  profileImage: string;
  badges: string[];
}

const LeetPool = () => {
  const [leaderboard, setLeaderboard] = useState<Coder[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        
        // Fetch user profiles from Supabase
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('streak', { ascending: false });
        
        if (error) {
          console.error('Error fetching profiles:', error);
          return;
        }
        
        // Map Supabase profiles to the Coder format
        const profileCoders = profiles.map((profile: any, index: number) => ({
          id: profile.id,
          name: profile.full_name,
          username: profile.username,
          streak: profile.streak || Math.floor(Math.random() * 50),
          profileImage: profile.avatar_url || `https://avatars.dicebear.com/api/initials/${profile.username}.svg`,
          badges: ["LeetCafe Member", "Learning Path"]
        }));
        
        // Add predefined coders if there aren't enough profiles
        const predefinedCoders: Coder[] = [
          {
            id: 1,
            name: "Rahul Sharma",
            username: "algo_guru",
            streak: 1562,
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
            badges: ["Contest Winner", "Hard Problem Expert"]
          },
          {
            id: 2,
            name: "Priya Patel",
            username: "code_queen",
            streak: 1487,
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
            badges: ["Dynamic Programming Guru", "Weekly Contest Champion"]
          },
          {
            id: 3,
            name: "Vikram Singh",
            username: "leetcode_ninja",
            streak: 1435,
            profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
            badges: ["Graph Theory Expert", "1000+ Problems Solved"]
          },
          {
            id: 4,
            name: "Neha Gupta",
            username: "algo_princess",
            streak: 1388,
            profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
            badges: ["BFS/DFS Master", "Top Contributor"]
          }
        ];
        
        // Combine profiles with predefined coders if needed
        const allCoders = [...profileCoders];
        
        // Only add predefined coders if we don't have many real profiles
        if (profileCoders.length < 5) {
          allCoders.push(...predefinedCoders);
        }
        
        // Sort by streak
        allCoders.sort((a, b) => b.streak - a.streak);
        
        setLeaderboard(allCoders);
      } catch (error) {
        console.error('Error in LeetPool:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfiles();
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
        
        {loading ? (
          <div className="flex justify-center">
            <div className="h-32 w-32 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaderboard.map((coder, index) => (
              <Card key={index} className="bg-card border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-accent/20 hover:-translate-y-1">
                <div className="p-1 bg-gradient-to-r from-amber-500 via-code-blue to-code-purple"></div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={coder.profileImage} 
                        alt={coder.name}
                        className="rounded-full h-16 w-16 object-cover border-2 border-border" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://avatars.dicebear.com/api/initials/${coder.username}.svg`;
                        }}
                      />
                      {index <= 2 && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full bg-card border border-border">
                          <Trophy 
                            className={`h-4 w-4 ${
                              index === 0 
                                ? 'text-yellow-500' 
                                : index === 1 
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
        )}
      </div>
    </section>
  );
};

export default LeetPool;
