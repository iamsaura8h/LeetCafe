
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { menuItems, MenuItem as MenuItemType } from '@/data/menuItems';
import { Coffee, Leaf, Utensils, Cake, Star } from 'lucide-react';
import MenuItem from './MenuItem';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: "coffee", name: "Coffee", icon: Coffee },
    { id: "tea", name: "Tea", icon: Leaf },
    { id: "food", name: "Food", icon: Utensils },
    { id: "dessert", name: "Dessert", icon: Cake }
  ];
  
  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category === selectedCategory) 
    : menuItems;
  
  return (
    <section id="menu" className="py-16 bg-[#ebedef] dark:bg-secondary/80">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 font-mono text-black">OUR MENU</Badge>
          <h2 className="text-3xl font-bold mb-4 text-blue-950">Café Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quality ingredients, creative recipes, and programmer-themed treats to fuel your coding sessions.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-2 text-black"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          
          {categories.map(category => {
            const CategoryIcon = category.icon;
            return (
              <Badge 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-2 flex items-center gap-2 text-black"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CategoryIcon className="h-3 w-3" />
                {category.name}
              </Badge>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: MenuItemType) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
