import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  Tag,
  Truck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useApp, formatPrice, getCartTotal, getCartItemCount } from '../context/AppContext';

const Cart = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const applyCoupon = () => {
    setCouponError('');
    
    // Mock coupon validation
    const validCoupons = {
      'WELCOME10': 10,
      'SACRED15': 15,
      'VEDIC20': 20
    };
    
    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10, SACRED15, or VEDIC20');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0; // 10% discount for demo
  const shipping = subtotal >= 5000 ? 0 : 299; // Free shipping over ₹5000
  const total = subtotal - discount + shipping;

  if (state.cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Vedic Hearth</title>
          <meta name="description" content="Review your cart and proceed to checkout for authentic Vedic products." />
        </Helmet>

        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-poppins font-bold text-2xl mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Discover our sacred collection of pure cow ghee and Vedic products
              </p>
              <Button asChild className="sacred-gradient">
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({getCartItemCount(state.cart)} items) - Vedic Hearth</title>
        <meta name="description" content="Review your cart and proceed to checkout for authentic Vedic products." />
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="font-poppins font-bold text-3xl">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getCartItemCount(state.cart)} item{getCartItemCount(state.cart) !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-poppins font-semibold text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            {item.weight && (
                              <Badge variant="outline" className="text-xs">
                                {item.weight}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right min-w-0">
                            <p className="font-bold text-lg text-primary">
                              {formatPrice(item.price * item.quantity, state.currency)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price, state.currency)} each
                            </p>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-poppins">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Coupon Code */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Coupon Code</label>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Tag className="h-4 w-4 text-primary" />
                            <span className="font-medium">{appliedCoupon}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeCoupon}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            className={couponError ? 'border-destructive' : ''}
                          />
                          <Button 
                            variant="outline" 
                            onClick={applyCoupon}
                            disabled={!couponCode.trim()}
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                      {couponError && (
                        <p className="text-sm text-destructive">{couponError}</p>
                      )}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal, state.currency)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-{formatPrice(discount, state.currency)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-1">
                          <Truck className="h-4 w-4" />
                          <span>Shipping</span>
                        </div>
                        <span>
                          {shipping === 0 ? 'Free' : formatPrice(shipping, state.currency)}
                        </span>
                      </div>
                      
                      {shipping === 0 && (
                        <p className="text-sm text-green-600">
                          🎉 Free shipping applied!
                        </p>
                      )}
                      
                      {shipping > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Add {formatPrice(5000 - subtotal, state.currency)} more for free shipping
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total, state.currency)}</span>
                    </div>

                    <Button 
                      className="w-full sacred-gradient text-lg py-6"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    {/* Shipping Info */}
                    <div className="bg-muted p-3 rounded-lg space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="font-medium">Shipping Information</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ships globally in 5-10 days</li>
                        <li>• Free shipping over ₹5,000</li>
                        <li>• Secure packaging guaranteed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;