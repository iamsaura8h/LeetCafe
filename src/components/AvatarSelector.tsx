
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const avatarOptions = [
  { id: 1, src: '/avatars/Katara.jpg', alt: 'Katara' },
  { id: 2, src: '/avatars/Aang.jpg', alt: 'Aang' },
  { id: 3, src: '/avatars/Ai-Chan.jpg', alt: 'Ai Chan' },
  { id: 4, src: '/avatars/Aunt-Cass.jpg', alt: 'Aunt Cass' },
  { id: 5, src: '/avatars/Bodyguard.jpg', alt: 'Bodyguard' },
  { id: 6, src: '/avatars/Buzz-Lightyear.png', alt: 'Buzz Lightyear' },
  { id: 7, src: '/avatars/Dash-Parr.jpg', alt: 'Dash Parr' },
  { id: 8, src: '/avatars/Frozone.jpg', alt: 'Frozone' },
  { id: 9, src: '/avatars/Gingy.jpg', alt: 'Gingy' },
  { id: 10, src: '/avatars/Kazama.jpg', alt: 'Kazama' },
  { id: 11, src: '/avatars/Lambu.jpg', alt: 'Lambu' },
  { id: 12, src: '/avatars/Metroman.jpg', alt: 'Metroman' },
  { id: 13, src: '/avatars/MrBig.jpg', alt: 'Mr Big' },
  { id: 14, src: '/avatars/Ty-Lee.jpg', alt: 'Ty Lee' },
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
