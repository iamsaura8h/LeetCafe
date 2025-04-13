
import React from 'react';
import { Check, Clock, Coffee } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/contexts/TrayContext';
import { Button } from './ui/button';

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
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
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {getStatusIcon()}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{getStatusTitle()}</h3>
      <p className="text-muted-foreground mb-6">{status.message}</p>

      {status.status === 'ready' && (
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-4">
            Show this screen to the barista at the counter
          </p>
          <Button 
            variant="default" 
            className="bg-amber-500 hover:bg-amber-600"
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
