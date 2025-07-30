import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sacred-gradient rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">🐄</span>
              </div>
              <span className="font-poppins font-bold text-lg text-foreground">
                Vedic Hearth
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From the cow to your home – pure, sacred, natural. We bring you authentic 
              Vedic products crafted with love and tradition, trusted by families in 20+ countries.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'All Products', href: '/products' },
                { name: 'Cow Ghee', href: '/products?category=cow-ghee' },
                { name: 'Cow Dung Crafts', href: '/products?category=cow-dung-crafts' },
                { name: 'Organic Farming', href: '/products?category=organic-farming' },
                { name: 'Track Order', href: '/track-order' },
                { name: 'My Account', href: '/account' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-foreground">Customer Care</h3>
            <ul className="space-y-2">
              {[
                { name: 'Help Center', href: '/help' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns & Refunds', href: '/returns' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-foreground">Stay Connected</h3>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@vedichearth.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Vrindavan, Uttar Pradesh, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Subscribe for sacred wisdom & exclusive offers
              </p>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 text-sm"
                />
                <Button size="sm" className="sacred-gradient">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Vedic Hearth. Made with{' '}
              <Heart className="inline h-4 w-4 text-red-500 mx-1" />{' '}
              for a healthier world.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>🌍 Free shipping over ₹5,000</span>
              <span>📦 Ships to 20+ countries</span>
              <span>✅ 100% Natural & Pure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Ships Globally" Banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg z-40"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Free International Shipping!</p>
            <p className="text-xs opacity-90">On orders above ₹5,000</p>
          </div>
          <Button variant="secondary" size="sm" className="text-xs">
            Shop Now
          </Button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;