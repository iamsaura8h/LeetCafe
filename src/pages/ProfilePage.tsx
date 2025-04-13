
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OrderHistory from '@/components/OrderHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, History, LogOut, Coffee, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AvatarSelector from '@/components/AvatarSelector';

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage 
                      src={profile.avatar_choice || profile.avatar_url || '/images/katara.png'} 
                      alt={profile.username} 
                    />
                    <AvatarFallback>
                      {profile.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{profile.full_name}</h3>
                  <p className="text-muted-foreground mb-6">@{profile.username}</p>
                  
                  <Button 
                    variant="outline" 
                    className="mb-2 w-full flex items-center" 
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center" 
                    onClick={() => navigate('/')}
                  >
                    <Coffee className="mr-2 h-4 w-4" /> Return to Cafe
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="orders">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="orders" className="flex-1">
                    <History className="mr-2 h-4 w-4" /> Order History
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex-1">
                    <UserRound className="mr-2 h-4 w-4" /> Account Details
                  </TabsTrigger>
                  <TabsTrigger value="avatar" className="flex-1">
                    <Image className="mr-2 h-4 w-4" /> Avatar
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders">
                  <OrderHistory />
                </TabsContent>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        View and manage your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Name</h4>
                        <p className="text-sm text-muted-foreground">{profile.full_name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Username</h4>
                        <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Member Since</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="avatar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalize Your Avatar</CardTitle>
                      <CardDescription>
                        Choose an avatar that represents you in LeetCafe
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AvatarSelector />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
