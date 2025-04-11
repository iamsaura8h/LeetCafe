
import React from 'react';
import { Github, Twitter, Instagram, Code2, Heart, Coffee } from 'lucide-react';
import BinaryPassword from './BinaryPassword';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-mono font-bold">
                Leet<span className="text-code-blue">Cafe</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              A café designed for competitive programmers to code, collaborate, and caffeinate.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Visit Us</h3>
            <address className="text-muted-foreground text-sm not-italic space-y-2">
              <p>123 Algorithm Avenue</p>
              <p>Coding District</p>
              <p>Tech City, TC 10101</p>
              <p className="pt-2">Open 7 AM - 11 PM</p>
            </address>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>
                <a href="#menu" className="hover:text-foreground transition-colors">Café Menu</a>
              </li>
              <li>
                <a href="#cafe-space" className="hover:text-foreground transition-colors">Our Space</a>
              </li>
              <li>
                <a href="#problem" className="hover:text-foreground transition-colors">Problem of the Day</a>
              </li>
              <li>
                <a href="#wall-of-fame" className="hover:text-foreground transition-colors">Wall of Fame</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Weekly Contests</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Host an Event</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">WiFi Access</h3>
            <div className="text-sm space-y-3">
              <div>
                <div className="text-muted-foreground mb-1">Network:</div>
                <div className="font-mono">LeetCafe_5GHz</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Password:</div>
                <BinaryPassword word="leetcode" className="mt-1" />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Our password changes weekly. Current password valid until April 17th, 2025.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-amber-500" /> for coffee enthusiasts who code
          </p>
          <p className="mt-1">© 2025 LeetCafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
