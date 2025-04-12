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

  const generateRandomAvatar = (username: string) => {
    // Use themed avatars that match the cafe's aesthetic
    const themes = [
      'initials', 'micah', 'personas', 'bottts', 'avataaars', 'lorelei'
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    return `https://avatars.dicebear.com/api/${randomTheme}/${username}.svg`;
  };

  const signUp = async (email: string, password: string, username: string, name: string) => {
    try {
      const avatar_url = generateRandomAvatar(username);
      
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
        // Username-based login - first look up the email
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username)
          .single();
        
        if (profileError || !profileData) {
          console.error('Username lookup error:', profileError);
          return { error: { message: 'Username not found' } };
        }
        
        // Find the user in auth.users using the profile ID
        const { data: userData, error: userError } = await supabase
          .from('auth')
          .select('email')
          .eq('id', profileData.id)
          .single();
        
        if (userError || !userData) {
          // Try to sign in with the username directly as email
          const { error } = await supabase.auth.signInWithPassword({
            email: username,
            password,
          });
          
          if (error) {
            console.error('Username login error:', error);
            return { error: { message: 'Invalid username or password' } };
          }
        } else {
          // Sign in with the retrieved email
          const { error } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password,
          });
          
          if (error) {
            console.error('Email login error:', error);
            return { error };
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
