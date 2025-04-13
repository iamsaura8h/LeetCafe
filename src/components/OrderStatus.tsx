
import React, { useEffect, useState } from 'react';
import { Check, Clock, Coffee, Receipt } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/contexts/TrayContext';
import { Button } from './ui/button';
import { useTray } from '@/contexts/TrayContext';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from './ui/separator';
import { format } from 'date-fns';

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const { user } = useAuth();
  const { tray } = useTray();
  const orderId = status.orderId || `LC-${Math.floor(10000 + Math.random() * 90000)}`;
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (status.status === 'ready') {
      // Create a pulsing effect for the "show to staff" message
      const interval = setInterval(() => {
        setIsVisible(prev => !prev);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [status.status]);

  const getStatusIcon = () => {
    switch (status.status) {
      case 'pending':
        return <Clock className="h-12 w-12 text-amber-500" />;
      case 'preparing':
        return <Coffee className="h-12 w-12 text-amber-500 animate-pulse" />;
      case 'ready':
        return <Check className="h-12 w-12 text-green-500" />;
      default:
        return <Clock className="h-12 w-12 text-amber-500" />;
    }
  };

  const getStatusTitle = () => {
    switch (status.status) {
      case 'pending':
        return 'Order Received';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Order Ready';
      default:
        return 'Processing Order';
    }
  };

  if (status.status === 'ready') {
    // Receipt view when order is ready
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="bg-[#DDDEDF]  border text-black rounded-md shadow-sm max-w-sm w-full mx-auto">
          {/* Receipt Header */}
          <div className="border-b p-4">
            <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl mb-2 flex items-center">
              <Coffee className="h-5 w-5 mr-0.5 mt-0.5" /> LeetCafe
            </h1>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {format(new Date(), 'MMM d, yyyy, h:mm a')}
                </div>
                <div className="text-sm font-medium">#{orderId}</div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="p-4">
            <h2 className="font-semibold mb-2 flex items-center">
              Reciept
            </h2>
            
            <div className="space-y-2 my-4">
              {status.items && status.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-3" />
            
            {/* Order Totals */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{status.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span>₹{status.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-1">
                <span>Total</span>
                <span>₹{status.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
          
          {/* Show to staff message */}
          {/* <div className={`mt-2 mb-4 text-center ${isVisible ? 'opacity-100' : 'opacity-40'} transition-opacity duration-500`}>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
              Show this to the barista
            </div>
          </div> */}
          
         
        </div>
        <div className="border-t p-4 w-full">
            <Button 
              variant="default" 
              className="bg-amber-500 hover:bg-amber-600 w-full"
              onClick={() => window.location.reload()}
            >
              Place New Order
            </Button>
          </div>
      </div>
    );
  }

  // Status view when order is being processed
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {getStatusIcon()}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{getStatusTitle()}</h3>
      <p className="text-muted-foreground mb-6">{status.message}</p>

      <div className="flex items-center space-x-2 mt-4">
        <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
        <p className="text-sm text-muted-foreground">Updating status in real-time</p>
      </div>
    </div>
  );
};

export default OrderStatus;
