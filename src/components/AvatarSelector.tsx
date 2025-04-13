
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const avatarOptions = [
  { id: 1, src: '/images/katara.png', alt: 'Avatar 1' },
  { id: 2, src: '/images/a.jpg', alt: 'Avatar 2' },
  { id: 3, src: '/images/b.jpg', alt: 'Avatar 3' },
  { id: 4, src: '/images/barista.jpg', alt: 'Avatar 4' },
  { id: 5, src: '/images/cafe.jpeg', alt: 'Avatar 5' },
  { id: 6, src: '/images/cafeatmos.jpg', alt: 'Avatar 6' },
  { id: 7, src: '/images/hero1.jpeg', alt: 'Avatar 7' },
  { id: 8, src: '/images/ppl.jpg', alt: 'Avatar 8' },
  { id: 9, src: '/images/study.jpg', alt: 'Avatar 9' },
];

const AvatarSelector = () => {
  const { user, profile } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    profile?.avatar_choice || null
  );
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleAvatarSelect = async (avatarSrc: string) => {
    if (!user) return;
    
    setSelectedAvatar(avatarSrc);
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_choice: avatarSrc })
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating avatar:', error);
        toast.error('Failed to update avatar');
      } else {
        toast.success('Avatar updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose Your Avatar</h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {avatarOptions.map((avatar) => (
          <Card 
            key={avatar.id}
            className={`p-2 cursor-pointer hover:shadow-md transition-shadow ${
              selectedAvatar === avatar.src ? 'ring-2 ring-amber-500' : ''
            }`}
            onClick={() => handleAvatarSelect(avatar.src)}
          >
            <Avatar className="h-16 w-16 mx-auto">
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </Card>
        ))}
      </div>
      
      {isUpdating && (
        <div className="text-center text-sm text-muted-foreground">
          Updating your avatar...
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
