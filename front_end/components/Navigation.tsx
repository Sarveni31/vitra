import { useState } from 'react';
import { Button } from './ui/button';
import { Home, BarChart3, Brain, Plus, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentScreen: 'home' | 'input' | 'prediction';
  onScreenChange: (screen: 'home' | 'input' | 'prediction') => void;
}

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: 'Dashboard', icon: Home },
    { id: 'input' as const, label: 'Add Data', icon: Plus },
    { id: 'prediction' as const, label: 'Predictions', icon: Brain },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Vitra</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentScreen === item.id ? 'default' : 'ghost'}
                  onClick={() => onScreenChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentScreen === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      onScreenChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}