import React from 'react';
import { Coffee, MapPin, Phone, Clock, Calendar, Check } from 'lucide-react';
import { OrderStatus as OrderStatusType } from '@/contexts/TrayContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const { orderId, items, subtotal, tax, total, paymentMethod } = status;
  const orderDate = new Date();

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;
    
    // Add better fonts
    doc.setFont('helvetica', 'normal');
    doc.setFont('helvetica', 'bold');
    doc.setFont('courier', 'normal');

    // Header with better styling
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("LeetCafe", pageWidth / 2, y, { align: "center" });

    y += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text("Where Coders Caffeine Up!", pageWidth / 2, y, { align: "center" });

    y += 8;
    doc.setLineWidth(0.7);
    doc.setDrawColor(50);
    doc.line(15, y, pageWidth - 15, y);

    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(`Order ID: ${orderId}`, 15, y);
    doc.text(`Date: ${format(orderDate, 'MMM d, yyyy')}  ${format(orderDate, 'h:mm a')}`, pageWidth - 15, y, { align: "right" });

    y += 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Items", 15, y);

    y += 6;
    // Add subtle header line
    doc.setLineWidth(0.3);
    doc.setDrawColor(180);
    doc.line(15, y, pageWidth - 15, y);
    y += 4;

    // Items with improved spacing and alignment
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    items?.forEach((item) => {
      const name = `${item.name} × ${item.quantity}`;
      // Format price with proper alignment using Rs. instead of ₹
      const price = `INR ${Number(item.price * item.quantity).toFixed(2)}`;
      doc.text(name, 20, y);
      doc.text(price, pageWidth - 20, y, { align: "right" });
      y += 7;
    });

    y += 4;
    doc.setLineWidth(0.3);
    doc.setDrawColor(180);
    doc.line(15, y, pageWidth - 15, y);

    y += 8;
    // Create a function for consistent totals formatting
    const addTotalLine = (label, value, isBold = false, isLarge = false) => {
      if (isBold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }
      
      if (isLarge) {
        doc.setFontSize(12);
      } else {
        doc.setFontSize(10);
      }
      
      // Convert to number explicitly before formatting
      const numValue = Number(value || 0);
      doc.text(label, 20, y);
      doc.text(`INR ${numValue.toFixed(2)}`, pageWidth - 20, y, { align: "right" });
      y += 7;
    };
    
    // Format numbers consistently
    addTotalLine("Subtotal", subtotal || 0);
    addTotalLine("Tax (5%)", tax || 0);
    
    // Add a separator before total
    y += 1;
    doc.setLineWidth(0.5);
    doc.setDrawColor(100);
    doc.line(pageWidth / 2, y, pageWidth - 15, y);
    y += 5;
    
    addTotalLine("Total", total || 0, true, true);

    // Payment Method with better styling
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Payment: ${paymentMethod === "counter" ? "Pay at Counter" : "Paid Online"}`, 15, y);

    // Cafe Info with better styling
    y += 15;
    doc.setLineWidth(0.2);
    doc.setDrawColor(120);
    doc.line(15, y, pageWidth - 15, y);

    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(80);
    
    // Information block with icons (simulated with text)
    doc.setFont("helvetica", "bold");
    doc.text("Pickup Location:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text("123 LeetCode Lane, Algorithmic Avenue", 15, y + 5);
    
    doc.setFont("helvetica", "bold");
    doc.text("Contact:", 15, y + 12);
    doc.setFont("helvetica", "normal");
    doc.text("+91 9876543210", 15, y + 17);
    
    doc.setFont("helvetica", "bold");
    doc.text("Timings:", 15, y + 24);
    doc.setFont("helvetica", "normal");
    doc.text("Open 8am - 10pm Daily", 15, y + 29);

    // Thank You Footer with better styling
    y += 40;
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.setFont("helvetica", "italic");
    doc.text("Thanks for choosing LeetCafe!", pageWidth / 2, y, { align: "center" });

    doc.save(`LeetCafe_Order_${orderId}.pdf`);
  };

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
            <div className="text-sm text-left">
              <div className="font-semibold">Order #{orderId}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {format(orderDate, 'MMM d, yyyy')}
              </div>
            </div>
            <div className="text-sm text-right">
              <div className="font-semibold">{paymentMethod === 'counter' ? 'Pay at Counter' : 'Paid Online'}</div>
              <div className="text-xs text-gray-500 flex items-center justify-end">
                <Clock className="h-3 w-3 mr-1" />
                {format(orderDate, 'h:mm a')}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4">
          <h2 className="font-semibold mb-3 text-left flex items-center">
            <Check className="h-4 w-4 mr-1 text-green-600" />
            Order Ready for Pickup
          </h2>

          <div className="space-y-2 mb-4">
            {items && items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="flex-1">{item.name} × {item.quantity}</span>
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

      {/* Buttons & Message */}
      <div className="mt-6 w-full px-4 flex flex-col gap-3 sm:flex-col items-center">
        <p className="text-sm text-green-600 font-medium text-center">
          Show this receipt to the barista to collect your order
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 w-full"
            onClick={() => window.location.reload()}
          >
            Place New Order
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDownloadInvoice}
          >
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;