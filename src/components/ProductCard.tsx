import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useApp, formatPrice, Product } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { state, dispatch } = useApp();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const toggleWishlist = () => {
    const isInWishlist = state.wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="overflow-hidden hover-lift border-border h-full">
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
          {product.featured && (
            <Badge className="absolute top-4 right-4 sacred-gradient">
              Featured
            </Badge>
          )}
          <Button
            variant="secondary"
            size="icon"
            className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
              isInWishlist ? 'opacity-100' : ''
            }`}
            onClick={toggleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${
                isInWishlist ? 'fill-red-500 text-red-500' : ''
              }`} 
            />
          </Button>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
        
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {!product.inStock && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">(4.9)</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
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
              {product.weight && (
                <span className="text-xs text-muted-foreground">{product.weight}</span>
              )}
            </div>
            
            <Button 
              size="sm" 
              className="sacred-gradient"
              onClick={addToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;