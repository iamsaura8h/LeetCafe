
import React from 'react';
import { Code2, Coffee, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <nav className="py-4 border-b border-border">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-code-blue" />
          <span className="text-xl font-mono font-bold">
            Leet<span className="text-code-blue">Cafe</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors">
            Problem of the Day
          </a>
          <a href="#wall-of-fame" className="text-muted-foreground hover:text-foreground transition-colors">
            Wall of Fame
          </a>
          <a href="#menu" className="text-muted-foreground hover:text-foreground transition-colors">
            Menu
          </a>
        </div>
        
        <Button className="hidden md:flex gap-2 bg-code-blue hover:bg-code-blue/80">
          <Coffee className="h-4 w-4" /> Visit Us
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 z-50 bg-background border-b border-border animate-slide-up">
          <div className="container py-4 flex flex-col gap-4">
            <a 
              href="#about" 
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#problem" 
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Problem of the Day
            </a>
            <a 
              href="#wall-of-fame" 
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Wall of Fame
            </a>
            <a 
              href="#menu" 
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <Button className="w-full flex items-center justify-center gap-2 bg-code-blue hover:bg-code-blue/80">
              <Coffee className="h-4 w-4" /> Visit Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
