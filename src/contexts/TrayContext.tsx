import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';
import { menuItems, MenuItem } from '@/data/menuItems';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface TrayItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface TrayState {
  items: TrayItem[];
  total: number;
}

type TrayAction =
  | { type: 'ADD_ITEM'; payload: TrayItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_TRAY' };

const initialState: TrayState = {
  items: [],
  total: 0,
};

// Load tray from localStorage if available
const loadInitialState = (): TrayState => {
  if (typeof window === 'undefined') return initialState;
  
  const savedTray = localStorage.getItem('leetcafe-tray');
  return savedTray ? JSON.parse(savedTray) : initialState;
};

const calculateTotal = (items: TrayItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const trayReducer = (state: TrayState, action: TrayAction): TrayState => {
  let newState: TrayState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // Item already exists, increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        
        newState = {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // New item
        const updatedItems = [...state.items, action.payload];
        
        newState = {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      break;
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      
      newState = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
      break;
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const updatedItems = state.items.filter(item => item.id !== id);
        
        newState = {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Update quantity
        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        
        newState = {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      break;
    }
    
    case 'CLEAR_TRAY': {
      newState = initialState;
      break;
    }
    
    default:
      return state;
  }
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('leetcafe-tray', JSON.stringify(newState));
  }
  
  return newState;
};

export interface OrderStatus {
  status: 'pending' | 'preparing' | 'ready';
  message: string;
  orderId?: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal?: number;
  tax?: number;
  total?: number;
}

interface TrayContextType {
  tray: TrayState;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearTray: () => void;
  placeOrder: () => Promise<boolean>;
  orderStatus: OrderStatus | null;
}

const TrayContext = createContext<TrayContextType | undefined>(undefined);

export const TrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tray, dispatch] = useReducer(trayReducer, initialState, loadInitialState);
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus | null>(null);
  const { user } = useAuth();

  // Save tray to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('leetcafe-tray', JSON.stringify(tray));
  }, [tray]);

  const addItem = (item: MenuItem, quantity = 1) => {
    const trayItem: TrayItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      category: item.category,
    };
    
    dispatch({ type: 'ADD_ITEM', payload: trayItem });
    toast.success(`Added ${item.name} to your tray`);
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearTray = () => {
    dispatch({ type: 'CLEAR_TRAY' });
  };

  const placeOrder = async (): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to place an order');
      return false;
    }

    if (tray.items.length === 0) {
      toast.error('Your tray is empty');
      return false;
    }

    try {
      // Generate a unique order ID
      const orderId = `LC-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // First create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_price: tray.total,
          status: 'pending'
        })
        .select('id')
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        toast.error('Failed to place order. Please try again.');
        return false;
      }

      // Then create order items
      const orderItems = tray.items.map(item => ({
        order_id: orderData.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        toast.error('Failed to place order. Please try again.');
        return false;
      }

      // Order placed successfully
      toast.success('Order placed successfully!');
      
      // Calculate tax and total
      const subtotal = tray.total;
      const tax = subtotal * 0.05;
      const total = subtotal + tax;
      
      // Set initial status with orderId and items for receipt
      setOrderStatus({
        status: 'pending',
        message: 'Your order has been received and is being processed.',
        orderId: orderId,
        items: tray.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        tax,
        total
      });
      
      // Simulate status updates
      setTimeout(() => {
        setOrderStatus(prev => prev ? {
          ...prev,
          status: 'preparing',
          message: 'Our baristas are now preparing your order.'
        } : null);
        
        setTimeout(() => {
          setOrderStatus(prev => prev ? {
            ...prev,
            status: 'ready',
            message: 'Your order is ready! Please collect it at the counter.'
          } : null);
        }, 8000);
      }, 5000);
      
      clearTray();
      return true;
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
      return false;
    }
  };

  return (
    <TrayContext.Provider
      value={{
        tray,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        placeOrder,
        orderStatus
      }}
    >
      {children}
    </TrayContext.Provider>
  );
};

export const useTray = () => {
  const context = useContext(TrayContext);
  if (context === undefined) {
    throw new Error('useTray must be used within a TrayProvider');
  }
  return context;
};
