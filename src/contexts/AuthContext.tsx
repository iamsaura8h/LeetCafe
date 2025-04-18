
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  signUp: (email: string, password: string, username: string, name: string) => Promise<{ error: any }>;
  signIn: (username: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAvatar = () => {
    // List of avatar options from the public/avatars folder
    const avatarOptions = [
      '/avatars/Katara.jpg',
      '/avatars/Aang.jpg',
      '/avatars/Ai-Chan.jpg',
      '/avatars/Aunt-Cass.jpg',
      '/avatars/Bodyguard.jpg',
      '/avatars/Buzz-Lightyear.png',
      '/avatars/Dash-Parr.jpg',
      '/avatars/Frozone.jpg',
      '/avatars/Gingy.jpg',
      '/avatars/Kazama.jpg',
      '/avatars/Lambu.jpg',
      '/avatars/Metroman.jpg',
      '/avatars/MrBig.jpg',
      '/avatars/Ty-Lee.jpg',
    ];
    
    // Select a random avatar from the options
    return avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
  };

  const signUp = async (email: string, password: string, username: string, name: string) => {
    try {
      // Get a random avatar from our selection
      const avatar_url = getRandomAvatar();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name,
            avatar_url
          }
        }
      });
      
      if (error) {
        return { error };
      }
      
      toast.success('Account created! Please check your email for verification.');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      // Check if input looks like an email
      const isEmail = username.includes('@');
      
      if (isEmail) {
        // Direct login with email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password,
        });
        
        if (error) {
          console.error('Email login error:', error);
          return { error };
        }
        
        toast.success('Successfully signed in!');
        navigate('/');
        return { error: null };
      } else {
        // Username-based login - first look up the profile by username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();
        
        if (profileError || !profileData) {
          console.error('Username lookup error:', profileError);
          return { error: { message: 'Username not found' } };
        }
        
        // For username login, we don't have the email in the profiles table
        // So we'll try to sign in with the username directly as the email
        // First try with the username@example.com pattern that many apps use
        const { error } = await supabase.auth.signInWithPassword({
          email: `${username}@example.com`,
          password,
        });
        
        if (error) {
          // If that fails, try with just the username (in case they registered with username as email)
          const { error: secondError } = await supabase.auth.signInWithPassword({
            email: username,
            password,
          });
          
          if (secondError) {
            console.error('Username-based login error:', secondError);
            return { error: { message: 'Invalid username or password' } };
          }
        }
        
        toast.success('Successfully signed in!');
        navigate('/');
        return { error: null };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.info('You have been signed out');
    navigate('/');
  };

  const value = {
    session,
    user,
    profile,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
