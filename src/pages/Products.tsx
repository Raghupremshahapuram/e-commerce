import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  Star, 
  ShoppingCart, 
  Heart,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '../components/ui/sheet';
import { useApp, formatPrice } from '../context/AppContext';
import { mockProducts, categories } from '../utils/mockData';

const Products = () => {
  const { state, dispatch } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (categoryFilter !== 'all') {
      const categoryName = categories.find(cat => cat.id === categoryFilter)?.name;
      if (categoryName) {
        filtered = filtered.filter(product => product.category === categoryName);
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [categoryFilter, searchQuery, priceRange, sortBy]);

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const toggleWishlist = (product: any) => {
    const isInWishlist = state.wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const FilterPanel = () => (
    <div className="space-y-6 p-4">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              setSearchParams({});
              setIsFilterOpen(false);
            }}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={categoryFilter === category.id ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setSearchParams({ category: category.id });
                setIsFilterOpen(false);
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-299">Under ₹299</SelectItem>
            <SelectItem value="300-599">₹300 - ₹599</SelectItem>
            <SelectItem value="600-999">₹600 - ₹999</SelectItem>
            <SelectItem value="1000-1999">₹1,000 - ₹1,999</SelectItem>
            <SelectItem value="2000">Above ₹2,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSearchParams({});
          setPriceRange('all');
          setSearchQuery('');
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>All Products - Pure Cow Ghee & Vedic Products | Vedic Hearth</title>
        <meta name="description" content="Shop our complete range of pure A2 cow ghee, cow dung crafts, and organic Vedic products. Free international shipping available." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-muted/30 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
                Sacred Products Collection
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our complete range of authentic Vedic products crafted with love and tradition
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <FilterPanel />
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect products
                      </SheetDescription>
                    </SheetHeader>
                    <FilterPanel />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryFilter !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    Category: {categories.find(cat => cat.id === categoryFilter)?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchParams({})}
                    />
                  </Badge>
                )}
                {priceRange !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    Price: {priceRange}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setPriceRange('all')}
                    />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    Search: {searchQuery}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found matching your criteria
                  </p>
                  <Button onClick={() => {
                    setSearchParams({});
                    setPriceRange('all');
                    setSearchQuery('');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {viewMode === 'grid' ? (
                        <Card className="overflow-hidden hover-lift group">
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
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => toggleWishlist(product)}
                            >
                              <Heart 
                                className={`h-4 w-4 ${
                                  state.wishlist.some(item => item.id === product.id) 
                                    ? 'fill-red-500 text-red-500' 
                                    : ''
                                }`} 
                              />
                            </Button>
                          </div>
                          
                          <CardContent className="p-4">
                            <h3 className="font-poppins font-semibold text-lg mb-2">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                              <span className="text-xs text-muted-foreground ml-2">(4.9)</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
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
                                onClick={() => addToCart(product)}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        // List view
                        <Card className="overflow-hidden hover-lift">
                          <div className="flex">
                            <div className="w-32 h-32 flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-poppins font-semibold text-lg mb-2">
                                    {product.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-3">
                                    {product.description}
                                  </p>
                                  
                                  <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                    <span className="text-xs text-muted-foreground ml-2">(4.9)</span>
                                  </div>
                                </div>
                                
                                <div className="text-right ml-4">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-bold text-lg text-primary">
                                      {formatPrice(product.price, state.currency)}
                                    </span>
                                    {product.originalPrice && (
                                      <span className="text-sm text-muted-foreground line-through">
                                        {formatPrice(product.originalPrice, state.currency)}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => toggleWishlist(product)}
                                    >
                                      <Heart 
                                        className={`h-4 w-4 ${
                                          state.wishlist.some(item => item.id === product.id) 
                                            ? 'fill-red-500 text-red-500' 
                                            : ''
                                        }`} 
                                      />
                                    </Button>
                                    <Button 
                                      className="sacred-gradient"
                                      onClick={() => addToCart(product)}
                                    >
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;