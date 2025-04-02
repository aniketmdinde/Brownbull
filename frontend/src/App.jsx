import React, { useState } from 'react';
import CreateShipment from './components/CreateShipment';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';

function App() {
  const [currentPage, setCurrentPage] = useState('createShipment');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage('orderDetails');
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setCurrentPage('orders');
  };

  return (
    <div className="min-h-screen bg-shipping">
      <div className="min-h-screen bg-gradient-to-b from-blue-400/50 to-blue-600/50 backdrop-blur-sm p-6">
        <div className="max-w-7xl mx-auto glass-effect rounded-lg shadow-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900">
              {currentPage === 'createShipment' 
                ? 'Create Shipment' 
                : currentPage === 'orders' 
                  ? 'Orders' 
                  : 'Order Details'}
            </h1>
            <div className="space-x-4">
              {currentPage === 'orderDetails' ? (
                <button
                  onClick={handleBackToOrders}
                  className="px-6 py-2 rounded-lg transition-all transform hover:scale-105 bg-white/80 text-blue-900"
                >
                  Back to Orders
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentPage('createShipment')}
                    className={`px-6 py-2 rounded-lg transition-all transform hover:scale-105 ${
                      currentPage === 'createShipment'
                        ? 'bg-blue-900 text-white'
                        : 'bg-white/80 text-blue-900'
                    }`}
                  >
                    Create Shipment
                  </button>
                  <button
                    onClick={() => setCurrentPage('orders')}
                    className={`px-6 py-2 rounded-lg transition-all transform hover:scale-105 ${
                      currentPage === 'orders'
                        ? 'bg-blue-900 text-white'
                        : 'bg-white/80 text-blue-900'
                    }`}
                  >
                    Orders
                  </button>
                </>
              )}
            </div>
          </div>
          
          {currentPage === 'createShipment' ? (
            <CreateShipment />
          ) : currentPage === 'orders' ? (
            <Orders onViewOrder={handleViewOrder} />
          ) : (
            <OrderDetails order={selectedOrder} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;