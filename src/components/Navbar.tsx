import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Coffee, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TrayButton from "./TrayButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  // sticky scroll for navbar
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 py-3 border-b border-border transition-colors duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur border-b border-border"
          : "bg-background"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-mono font-bold">
              Leet<span className="text-code-blue">Cafe</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#menu"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Menu
          </a>
          <a
            href="#cafe-space"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Our Space
          </a>
          <a
            href="#problem"
            className="text-muted-foreground hover:text-foreground transition-colors font-dancing"
          >
            Problem of the Day
          </a>
          <a
            href="#leetpool"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LeetPool
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <TrayButton />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-14 w-14 border-8 border-[#1D2330]">
                    <AvatarImage
                      src={profile?.avatar_choice || profile?.avatar_url || "/avatars/Katara.jpg"}
                      alt={profile?.username}
                    />
                    <AvatarFallback>
                      {profile?.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      @{profile?.username}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/signin')}
              >
                Sign in
              </Button>
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => navigate('/signup')}
              >
                <User className="h-4 w-4 mr-2" /> Sign up
              </Button>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <TrayButton />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
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
              href="#menu"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#cafe-space"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Space
            </a>
            <a
              href="#problem"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Problem of the Day
            </a>
            <a
              href="#leetpool"
              className="py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              LeetPool
            </a>

            {user ? (
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={profile?.avatar_choice || profile?.avatar_url || "/avatars/Katara.jpg"}
                      alt={profile?.username}
                    />
                    <AvatarFallback>
                      {profile?.username?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{profile?.username}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-1" /> Profile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <Button
                  className="w-full justify-center"
                  variant="outline"
                  onClick={() => navigate('/signin')}
                >
                  Sign in
                </Button>
                <Button
                  className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => navigate('/signup')}
                >
                  <User className="h-4 w-4 mr-2" /> Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
