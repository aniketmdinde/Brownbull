import React, { useState } from 'react';
import { Search, Filter, Calendar, Eye } from 'lucide-react';

function Orders({ onViewOrder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data for demonstration
  const orders = [
    {
      id: 'ORD-001',
      companyName: 'Tech Corp',
      totalPrice: 2500,
      totalVolume: 125.5,
      status: 'in progress',
      shipmentDate: '2024-03-20',
      pickupLocation: '123 Tech St, Silicon Valley',
      dropLocation: '456 Corp Ave, New York',
      transportMode: 'air',
      packages: [
        {
          type: 'box',
          dimensions: { length: 100, width: 50, height: 30 },
          weight: 25,
          units: 2
        }
      ]
    },
    {
      id: 'ORD-002',
      companyName: 'Global Logistics',
      totalPrice: 3800,
      totalVolume: 230.0,
      status: 'delivered',
      shipmentDate: '2024-03-18',
      pickupLocation: '789 Global Rd, Los Angeles',
      dropLocation: '321 Logistics Blvd, Chicago',
      transportMode: 'sea',
      packages: [
        {
          type: 'container',
          dimensions: { length: 200, width: 100, height: 100 },
          weight: 500,
          units: 1
        }
      ]
    },
    {
      id: 'ORD-003',
      companyName: 'Fast Shipping Inc',
      totalPrice: 1900,
      totalVolume: 85.75,
      status: 'in progress',
      shipmentDate: '2024-03-22',
      pickupLocation: '567 Fast St, Miami',
      dropLocation: '890 Ship Lane, Seattle',
      transportMode: 'land',
      packages: [
        {
          type: 'box',
          dimensions: { length: 80, width: 40, height: 40 },
          weight: 30,
          units: 3
        }
      ]
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by ID or company..."
            className="pl-10 w-full p-2 border rounded-lg bg-white/80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="pl-10 w-full p-2 border rounded-lg bg-white/80"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in progress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              className="pl-10 w-full p-2 border rounded-lg bg-white/80"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              className="pl-10 w-full p-2 border rounded-lg bg-white/80"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (CBM)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.companyName}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalPrice.toLocaleString()}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalVolume}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.shipmentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;