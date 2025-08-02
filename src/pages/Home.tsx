import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Globe, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp, formatPrice } from '../context/AppContext';
import { mockProducts, categories, testimonials } from '../utils/mockData';
import heroImage from '../assets/hero-vedic-ghee.jpg';

const Home = () => {
  const { state, dispatch } = useApp();
  const featuredProducts = mockProducts.filter(product => product.featured);

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    // Add toast notification here
  };

  return (
    <>
      <Helmet>
        <title>Pure Cow Ghee & Natural Products | Buy Online</title>
        <meta name="description" content="Buy pure A2 cow ghee, handmade cow dung products & organic Vedic lifestyle goods. Free international shipping. Trusted by 20+ countries." />
        <meta name="keywords" content="cow ghee, A2 ghee, cow dung products, organic, vedic, ayurvedic, natural products" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/20 text-white border-white/20">
              ✨ Trusted by Vedic homes in 20+ countries
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6 leading-tight">
              From the Cow to Your Home
              <span className="block text-primary-glow">Pure. Sacred. Natural.</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover authentic A2 cow ghee and handcrafted Vedic products made with ancient wisdom 
              and shipped globally with love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="sacred-gradient text-lg px-8 py-6 hover-lift"
                asChild
              >
                <Link to="/products">
                  Shop Ghee & More
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="sacred-gradient text-lg px-8 py-6 hover-lift"
                asChild
              >
                <Link to="/about">
                  Our Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🐄
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-4xl opacity-20"
        >
          🪔
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-primary" />,
                title: "Global Shipping",
                description: "Free international delivery over ₹5,000"
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "100% Pure & Natural",
                description: "No chemicals, preservatives or artificial additives"
              },
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Ancient Wisdom",
                description: "Traditional methods passed down through generations"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 sacred-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Featured Sacred Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked treasures that bring the essence of Vedic tradition to your home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover-lift border-border">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-4 left-4 bg-destructive">
                        Save ₹{product.originalPrice - product.price}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-primary">
                            {formatPrice(product.price, state.currency)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice, state.currency)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">(4.9)</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="sacred-gradient"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our complete range of authentic Vedic products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/products?category=${category.id}`}>
                  <Card className="overflow-hidden hover-lift group cursor-pointer">
                    <div className="relative aspect-square">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-poppins font-semibold text-lg mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Loved by Families Worldwide
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from our global Vedic family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sacred-gradient text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
              Begin Your Sacred Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families who have embraced the pure, natural way of living 
              with our authentic Vedic products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/products">Start Shopping</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;