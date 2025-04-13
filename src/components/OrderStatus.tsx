
import React, { useEffect, useState } from 'react';
import { Check, Clock, Coffee, QrCode } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/contexts/TrayContext';
import { Button } from './ui/button';
import QRCode from 'react-qr-code';
import { useTray } from '@/contexts/TrayContext';
import { useAuth } from '@/contexts/AuthContext';

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const { user } = useAuth();
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

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="bg-amber-500 text-white p-4 rounded-t-lg w-full max-w-sm mb-6">
        <h2 className="text-xl font-bold">🧾 LeetCafe</h2>
        <p className="text-white opacity-90">🧠 Order #{orderId}</p>
      </div>
      
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {getStatusIcon()}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{getStatusTitle()}</h3>
      <p className="text-muted-foreground mb-6">{status.message}</p>

      {status.status === 'ready' && (
        <div className="mt-2 w-full max-w-sm">
          <div className={`mt-4 mb-6 text-center ${isVisible ? 'opacity-100' : 'opacity-40'} transition-opacity duration-500`}>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
              Show this to the barista
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">User:</span>
              <span className="text-sm font-medium">@{user?.email?.split('@')[0] || 'guest'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order ID:</span>
              <span className="text-sm font-medium">#{orderId}</span>
            </div>
          </div>
          
          <Button 
            variant="default" 
            className="bg-amber-500 hover:bg-amber-600 w-full"
            onClick={() => window.location.reload()}
          >
            Place New Order
          </Button>
        </div>
      )}

      {status.status !== 'ready' && (
        <div className="flex items-center space-x-2 mt-4">
          <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-muted-foreground">Updating status in real-time</p>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
