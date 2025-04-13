
import React, { useState } from 'react';
import { useTray } from '@/contexts/TrayContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, Coffee, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import OrderStatus from './OrderStatus';
import PaymentDialog from './PaymentDialog';

const TrayView = () => {
  const { tray, removeItem, updateQuantity, placeOrder, orderStatus } = useTray();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleQuantityChange = (id: number, delta: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      toast.error('Please sign in to place an order', {
        action: {
          label: 'Sign In',
          onClick: () => navigate('/signin')
        }
      });
      return;
    }
    
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = async () => {
    const success = await placeOrder();
    setIsPaymentOpen(false);
  };

  if (orderStatus) {
    return <OrderStatus status={orderStatus} />;
  }

  if (tray.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/50 p-5 rounded-full mb-4">
          <Coffee className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">Your tray is empty</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Add some delicious items from our menu to get started.
        </p>
        <a href="#menu">
          <Button variant="outline" size="sm" >
            View Menu
          </Button>
        </a>
      </div>
    );
  }

  // Calculate tax and total
  const subtotal = tray.total;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto py-4">
        {tray.items.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="w-6 text-center">{item.quantity}</span>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-destructive" 
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        <Separator className="my-4" />
        
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1 font-medium">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600" 
          onClick={handleOrderClick}
        >
          Place Order <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <PaymentDialog
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onComplete={handlePaymentComplete}
        amount={total.toFixed(2)}
      />
    </div>
  );
};

export default TrayView;
