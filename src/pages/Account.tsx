import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useApp, formatPrice } from '../context/AppContext';

const Account = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 1299,
      items: [
        { name: 'Pure A2 Cow Ghee', quantity: 2, price: 899 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 598,
      items: [
        { name: 'Cow Dung Diyas Set', quantity: 1, price: 299 },
        { name: 'Organic Fertilizer', quantity: 1, price: 199 }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>My Account - {state.user.name} | Vedic Hearth</title>
        <meta name="description" content="Manage your Vedic Hearth account, view orders, and update your preferences." />
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-poppins font-bold text-3xl mb-2">
                Welcome back, {state.user.name}
              </h1>
              <p className="text-muted-foreground">
                Manage your account and track your sacred journey
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 sacred-gradient rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{state.user.name}</p>
                      <p className="text-sm text-muted-foreground">{state.user.email}</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    {[
                      { icon: Package, label: 'My Orders', active: true },
                      { icon: Heart, label: 'Wishlist', count: state.wishlist.length },
                      { icon: MapPin, label: 'Addresses' },
                      { icon: CreditCard, label: 'Payment Methods' },
                      { icon: Settings, label: 'Account Settings' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant={item.active ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.label}
                          {item.count !== undefined && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.count}
                            </Badge>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                    
                    <Separator className="my-4" />
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{state.wishlist.length}</p>
                    <p className="text-sm text-muted-foreground">Wishlist Items</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">
                      {formatPrice(
                        orders.reduce((sum, order) => sum + order.total, 0),
                        state.currency
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Orders
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="border border-border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                Ordered on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                                className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {order.status}
                              </Badge>
                              <p className="text-sm font-semibold mt-1">
                                {formatPrice(order.total, state.currency)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex justify-between text-sm">
                                <span>{item.name} × {item.quantity}</span>
                                <span className="text-muted-foreground">
                                  {formatPrice(item.price, state.currency)}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {order.status === 'Delivered' && (
                              <Button variant="ghost" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Wishlist Preview */}
              {state.wishlist.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Your Wishlist
                        <Button variant="outline" size="sm">
                          View All ({state.wishlist.length})
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {state.wishlist.slice(0, 4).map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                          >
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-sm text-primary font-semibold">
                                {formatPrice(item.price, state.currency)}
                              </p>
                            </div>
                            <Button size="sm" className="sacred-gradient">
                              Add to Cart
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;