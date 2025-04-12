import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuItems, MenuItem } from '@/data/menuItems';
import { Coffee, Leaf, Utensils, Cake, Star } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  
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
        <div className="text-center text-blue-950 mb-12">
          <Badge variant="outline" className="mb-2 font-mono text-black">OUR MENU</Badge>
          <h2 className="text-3xl font-bold mb-4">Café Menu</h2>
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
          {filteredItems.map((item: MenuItem) => (
            <Card key={item.id} className="bg-card border-none shadow-2xl hover:shadow-md transition-shadow-lg overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <AspectRatio ratio={4/3} className="bg-muted">
                  <img 
                    src={item.image || "/api/placeholder/400/300"} 
                    alt={item.name} 
                    className="object-cover w-full h-full" 
                  />
                </AspectRatio>
              </div>
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {item.name}
                      {item.popular && <Star className="h-4 w-4 text-amber-500 inline" />}
                    </CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </div>
                  <div className="font-mono font-bold text-amber-500">₹{item.price.toFixed(2)}</div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-3">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;