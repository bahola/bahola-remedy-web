
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  // This would typically be managed by a cart context or state management in a real app
  const [cartItems, setCartItems] = React.useState([
    {
      id: 'product-1',
      name: 'Arnica Montana 30C',
      description: 'For bruises and injuries',
      price: 185,
      image: '/placeholder.svg',
      quantity: 2
    },
    {
      id: 'product-2',
      name: 'Nux Vomica 200C',
      description: 'For digestive issues',
      price: 210,
      image: '/placeholder.svg',
      quantity: 1
    },
    {
      id: 'product-3',
      name: 'Eupatorium Perfoliatum Q',
      description: 'Mother tincture for fever',
      price: 320,
      image: '/placeholder.svg',
      quantity: 1
    }
  ]);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;
  
  return (
    <PageLayout title="Your Cart" description="Review and modify your selected items">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">
                  Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                </h2>
              </div>
              
              <ul className="divide-y">
                {cartItems.map(item => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-wrap md:flex-nowrap items-center">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-grow mt-4 md:mt-0">
                        <h3 className="font-medium">
                          <Link to={`/product/${item.id}`} className="hover:text-bahola-blue-500">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-bahola-neutral-600 text-sm">{item.description}</p>
                        <div className="mt-2 text-bahola-blue-600 font-bold">₹{item.price}</div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-3 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="ml-4 md:ml-8 mt-4 md:mt-0 text-right">
                        <div className="font-bold">₹{item.price * item.quantity}</div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 flex items-center mt-2 text-sm"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <Link to="/categories" className="text-bahola-blue-500 hover:text-bahola-blue-700 flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                  
                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bahola-neutral-600">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                
                {shipping > 0 && (
                  <div className="text-bahola-neutral-600 text-sm bg-bahola-blue-50 p-3 rounded">
                    Add ₹{500 - subtotal} more to qualify for free shipping
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <p className="text-bahola-neutral-500 text-xs mt-1">
                    (Including GST)
                  </p>
                </div>
                
                <Button asChild className="w-full mt-6">
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="text-center text-sm text-bahola-neutral-500 mt-4">
                  <p>We accept:</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="p-1 bg-gray-100 rounded">Credit Card</span>
                    <span className="p-1 bg-gray-100 rounded">UPI</span>
                    <span className="p-1 bg-gray-100 rounded">Net Banking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-bahola-neutral-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-bahola-neutral-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/categories">Start Shopping</Link>
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Cart;
