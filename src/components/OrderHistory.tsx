
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ShoppingBag, Clock, Coffee, Check } from 'lucide-react';
import { Badge } from './ui/badge';

interface OrderItem {
  id: string;
  item_name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  created_at: string;
  total_price: number;
  status: string;
  items: OrderItem[];
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch all orders for current user
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
          return;
        }

        // For each order, fetch its items
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('Error fetching order items:', itemsError);
              return {
                ...order,
                items: [],
              };
            }

            return {
              ...order,
              items: itemsData,
            };
          })
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error in fetchOrders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'preparing':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <Coffee className="mr-1 h-3 w-3" /> Preparing
          </Badge>
        );
      case 'ready':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <Check className="mr-1 h-3 w-3" /> Ready
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted p-3 rounded-full inline-flex mb-4">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
        <p className="text-muted-foreground mb-4">
          Your order history will appear here once you've placed an order.
        </p>
        <Button 
          variant="outline" 
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  Order {order.id.substring(0, 8)}
                </CardTitle>
                <CardDescription>
                  {format(new Date(order.created_at), 'PPP p')}
                </CardDescription>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Total: ₹{order.total_price.toFixed(2)}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
              </Button>
            </div>
            
            {expandedOrder === order.id && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;
