
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, CheckCircle } from 'lucide-react';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  amount: string;
}

const PaymentDialog = ({ isOpen, onClose, onComplete, amount }: PaymentDialogProps) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !expiryDate || !cvc || !name) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Close after showing success
      setTimeout(() => {
        onComplete();
        setCompleted(false);
        setCardNumber('');
        setExpiryDate('');
        setCvc('');
        setName('');
      }, 1500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {!completed ? (
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Order</DialogTitle>
              <DialogDescription>
                Enter your payment details to place your order.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  placeholder="4242 4242 4242 4242" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={processing}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    disabled={processing}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input 
                    id="cvc" 
                    placeholder="123" 
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    disabled={processing}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input 
                  id="name" 
                  placeholder="J. Smith" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={processing}
                  required
                />
              </div>
              
              <div className="pt-4 border-t text-right">
                <span className="font-bold text-lg">Total: ₹{amount}</span>
              </div>
            
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="animate-pulse">Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> Pay ₹{amount}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-center text-muted-foreground mb-6">
              Your order is being processed now.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
