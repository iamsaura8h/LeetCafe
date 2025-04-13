
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import { useTray } from '@/contexts/TrayContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import TrayView from './TrayView';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const TrayButton = () => {
  const { tray } = useTray();
  const { user, profile } = useAuth();
  const itemCount = tray.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <ShoppingBasket className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Your Tray</SheetTitle>
            {user && profile && (
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={profile.avatar_choice || profile.avatar_url || '/images/katara.png'} 
                  alt={profile.username} 
                />
                <AvatarFallback>
                  {profile.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <SheetDescription>
            Review your items and place an order
          </SheetDescription>
        </SheetHeader>
        <TrayView />
      </SheetContent>
    </Sheet>
  );
};

export default TrayButton;
