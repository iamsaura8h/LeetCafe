
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Receipt } from 'lucide-react';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  amount: string;
}

const PaymentDialog = ({ isOpen, onClose, onComplete, amount }: PaymentDialogProps) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const orderId = `LC-${Math.floor(10000 + Math.random() * 90000)}`;
  
  useEffect(() => {
    if (!isOpen || completed) return;
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen, completed]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Simulate payment completion
  const handlePaymentComplete = () => {
    if (completed) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Close after showing success
      setTimeout(() => {
        onComplete();
      }, 5000); // Show success for 5 seconds
    }, 2000);
  };
  
  // Handle paid at counter
  const handlePaidAtCounter = () => {
    setCompleted(true);
    
    // Complete the order immediately
    setTimeout(() => {
      onComplete();
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        {!completed ? (
          <>
            <div className="bg-amber-500 text-white p-4">
              <DialogTitle className="text-center text-xl">🧾 LeetCafe</DialogTitle>
              <DialogDescription className="text-center text-white opacity-90">
                🧠 Order #{orderId}
              </DialogDescription>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">🍽️ Tray Total:</p>
                  <p className="text-2xl font-bold">₹{amount}</p>
                </div>
                
                {/* Simple QR code placeholder */}
                <div className="flex justify-center p-2 bg-white rounded-lg my-6">
                  <div className="p-2 bg-white rounded border-2 border-dashed border-gray-300 w-48 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">QR Code</div>
                      <div className="font-mono text-xs">Scan to pay ₹{amount}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">📢 Scan with any UPI app to pay</p>
                  <div className="flex items-center justify-center gap-2 text-amber-500">
                    <Clock className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      Order will expire in {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-4">
                  <Button 
                    onClick={handlePaymentComplete}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    I've Paid Online
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handlePaidAtCounter}
                    className="w-full"
                  >
                    Pay at Counter
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-center text-muted-foreground mb-6">
              Your order is being processed now.
            </p>
            <div className="animate-pulse text-green-600 font-semibold">
              Show this screen to the staff
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
