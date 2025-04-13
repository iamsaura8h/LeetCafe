
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, Plus, Minus, ShoppingBasket } from 'lucide-react';
import { Button } from './ui/button';
import { useTray } from '@/contexts/TrayContext';
import { MenuItem as MenuItemType } from '@/data/menuItems';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => {
  const { addItem } = useTray();
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);

  const handleAddToTray = () => {
    addItem(item, quantity);
    setQuantity(1);
    setShowQuantity(false);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Card className="bg-card border-none shadow-2xl hover:shadow-md transition-shadow-lg overflow-hidden">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={item.image || "/placeholder.svg"} 
          alt={item.name} 
          className="object-cover w-full h-full" 
        />
      </div>
      <CardContent className="pb-3 pt-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              {item.name}
              {item.popular && <Star className="h-4 w-4 text-amber-500 inline" />}
            </h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="font-mono font-bold text-amber-500">₹{item.price.toFixed(2)}</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {item.vegan && (
            <Badge variant="outline" className="bg-code-green/10 text-code-green border-code-green/20">
              <Leaf className="mr-1 h-3 w-3" /> Vegan
            </Badge>
          )}
          
          {item.allergens?.map((allergen, index) => (
            <Badge key={index} variant="outline" className="bg-code-orange/10 text-code-orange border-code-orange/20 text-xs">
              {allergen}
            </Badge>
          ))}
        </div>

        {showQuantity ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-lg font-medium">{quantity}</span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600"
              onClick={handleAddToTray}
            >
              Add to Tray
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setShowQuantity(true)}
          >
            <ShoppingBasket className="mr-2 h-4 w-4" /> Add to Tray
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
