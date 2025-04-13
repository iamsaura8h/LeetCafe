
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
import { CheckCircle, Clock } from 'lucide-react';
import QRCode from 'react-qr-code';

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
  
  // Mock payment UPI string (in a real app, this would come from your backend)
  const upiPaymentString = `upi://pay?pa=leetcafe@ybl&pn=LeetCafe&am=${amount}&tr=${orderId}&cu=INR`;
  
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
  
  // For demo purposes, simulate payment completion when clicking on QR
  const handleSimulatePayment = () => {
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
                
                <div className="flex justify-center p-2 bg-white rounded-lg my-6">
                  <div className="p-2 bg-white rounded" onClick={handleSimulatePayment}>
                    <QRCode value={upiPaymentString} size={200} />
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
              </div>
            </div>
            
            <DialogFooter className="p-4 border-t">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="w-full"
              >
                Cancel Order
              </Button>
            </DialogFooter>
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
