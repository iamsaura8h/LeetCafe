
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Banknote, CreditCard } from 'lucide-react';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (paymentMethod: 'counter' | 'online') => void;
  amount: string;
}

const PaymentDialog = ({ isOpen, onClose, onComplete, amount }: PaymentDialogProps) => {
  const orderId = `LC-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const handlePaymentSelection = (paymentMethod: 'counter' | 'online') => {
    // Call the onComplete callback with the selected payment method
    onComplete(paymentMethod);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-2">Complete Your Order</DialogTitle>
          <DialogDescription className="text-center">
            Order #{orderId} • Total: ₹{amount}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={() => handlePaymentSelection('counter')}
            className="flex items-center justify-center gap-2 h-12"
            variant="outline"
          >
            <Banknote className="h-5 w-5" />
            Pay at Counter
          </Button>
          
          <Button 
            onClick={() => handlePaymentSelection('online')}
            className="flex items-center justify-center gap-2 h-12 bg-amber-500 hover:bg-amber-600"
          >
            <CreditCard className="h-5 w-5" />
            Paid Online
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
