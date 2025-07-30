import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  benefits?: string[];
  ingredients?: string[];
  weight?: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  currency: string;
  language: string;
  isLoading: boolean;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  currency: 'INR',
  language: 'EN',
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Utility functions
export const formatPrice = (price: number, currency: string) => {
  const symbols = { INR: '₹', USD: '$', EUR: '€' };
  return `${symbols[currency as keyof typeof symbols] || '$'}${price.toLocaleString()}`;
};

export const getCartTotal = (cart: CartItem[], currency: string) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return formatPrice(total, currency);
};

export const getCartItemCount = (cart: CartItem[]) => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};