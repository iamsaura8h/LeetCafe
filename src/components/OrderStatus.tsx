
import React from 'react';
import { Coffee, MapPin, Phone, Clock } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/contexts/TrayContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { format } from 'date-fns';

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const { orderId, items, subtotal, tax, total, paymentMethod } = status;
  
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="bg-white border text-black rounded-md shadow-sm max-w-sm w-full mx-auto">
        {/* Receipt Header */}
        <div className="border-b p-4">
          <h1 className="font-bold text-2xl mb-1 flex items-center justify-center">
            <Coffee className="h-5 w-5 mr-1" /> LeetCafe
          </h1>
          <p className="text-xs text-gray-500 mb-3">Where Coders Caffeine Up!</p>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div className="font-semibold">Order #{orderId}</div>
              <div className="text-xs text-gray-500">
                {format(new Date(), 'MMM d, yyyy')}
              </div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">{paymentMethod === 'counter' ? 'Pay at Counter' : 'Paid Online'}</div>
              <div className="text-xs text-gray-500">
                {format(new Date(), 'h:mm a')}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="p-4">
          <h2 className="font-semibold mb-3 text-left">Order Details</h2>
          
          <div className="space-y-2 mb-4">
            {items && items.map((item, index) => (
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
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (5%)</span>
              <span>₹{tax?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-1">
              <span>Total</span>
              <span>₹{total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
        
        {/* Cafe Details */}
        <div className="bg-gray-50 p-4 rounded-b-md border-t text-xs text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-3 w-3" /> 123 LeetCode Lane, Algorithmic Avenue
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="h-3 w-3" /> +91 9876543210
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-3 w-3" /> Open 8am-10pm Daily
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center w-full px-4">
        <p className="text-sm text-green-600 font-medium mb-3">Show this receipt to the barista to collect your order</p>
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
};

export default OrderStatus;
