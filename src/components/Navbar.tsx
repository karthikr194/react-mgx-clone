import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-primary text-primary-foreground text-sm text-center py-2 px-4">
        <span className="font-medium">🎉 Enjoy Limited-Time 21% OFF!</span>
        <a href="#pricing" className="ml-2 underline font-bold hover:text-primary-foreground/90 transition-smooth">
          Buy Now
        </a>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm shadow-sm z-50 border-b">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MGX
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#blog" className="text-foreground hover:text-primary transition-smooth">
                Blog
              </a>
              <a href="#use-case" className="text-foreground hover:text-primary transition-smooth">
                Use Case
              </a>
              <a href="#learn" className="text-foreground hover:text-primary transition-smooth">
                Learn
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-smooth">
                Pricing
              </a>
              <a href="#launched" className="text-foreground hover:text-primary transition-smooth">
                Launched
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-smooth">
                <Globe className="h-4 w-4" />
                <span className="text-sm">EN</span>
              </button>
              <a href="#signin" className="text-foreground hover:text-primary transition-smooth">
                Sign In
              </a>
              <Button className="bg-primary hover:bg-primary-dark transition-smooth">
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground hover:text-primary transition-smooth"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 animate-fade-in">
              <a href="#blog" className="block text-foreground hover:text-primary transition-smooth">
                Blog
              </a>
              <a href="#use-case" className="block text-foreground hover:text-primary transition-smooth">
                Use Case
              </a>
              <a href="#learn" className="block text-foreground hover:text-primary transition-smooth">
                Learn
              </a>
              <a href="#pricing" className="block text-foreground hover:text-primary transition-smooth">
                Pricing
              </a>
              <a href="#launched" className="block text-foreground hover:text-primary transition-smooth">
                Launched
              </a>
              <div className="pt-4 border-t space-y-3">
                <a href="#signin" className="block text-foreground hover:text-primary transition-smooth">
                  Sign In
                </a>
                <Button className="w-full bg-primary hover:bg-primary-dark transition-smooth">
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
