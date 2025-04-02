import React, { useState } from 'react';
import { MapPin, Calendar, Package, Truck, Ship, Plane } from 'lucide-react';

function OrderDetails({ order }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(order);

  const getTransportIcon = (mode) => {
    switch (mode) {
      case 'air':
        return <Plane size={20} />;
      case 'sea':
        return <Ship size={20} />;
      case 'land':
        return <Truck size={20} />;
      default:
        return null;
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the order
    setIsEditing(false);
    // Update the order in the parent component/database
  };

  const handleInputChange = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-center bg-white/80 p-6 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{order.id}</h2>
          <p className="text-gray-600">{order.companyName}</p>
        </div>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Edit Order
            </button>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Locations */}
        <div className="bg-white/80 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Locations</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-700">Pickup Location</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                <MapPin size={20} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrder.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  <span>{order.pickupLocation}</span>
                )}
              </div>
            </div>
            <div>
              <label className="text-gray-700">Drop Location</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                <MapPin size={20} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedOrder.dropLocation}
                    onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  <span>{order.dropLocation}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="bg-white/80 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">Transport Mode</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                {getTransportIcon(order.transportMode)}
                {isEditing ? (
                  <select
                    value={editedOrder.transportMode}
                    onChange={(e) => handleInputChange('transportMode', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="air">Air</option>
                    <option value="sea">Sea</option>
                    <option value="land">Land</option>
                  </select>
                ) : (
                  <span className="capitalize">{order.transportMode}</span>
                )}
              </div>
            </div>
            <div>
              <label className="text-gray-700">Shipment Date</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-white">
                <Calendar size={20} className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="date"
                    value={editedOrder.shipmentDate}
                    onChange={(e) => handleInputChange('shipmentDate', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  <span>{new Date(order.shipmentDate).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-white/80 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Packages</h3>
        <div className="space-y-4">
          {order.packages.map((pkg, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-gray-700">Type</label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Package size={20} className="text-gray-400" />
                    {isEditing ? (
                      <select
                        value={editedOrder.packages[index].type}
                        onChange={(e) => {
                          const newPackages = [...editedOrder.packages];
                          newPackages[index] = { ...newPackages[index], type: e.target.value };
                          handleInputChange('packages', newPackages);
                        }}
                        className="w-full bg-transparent outline-none"
                      >
                        <option value="box">Box</option>
                        <option value="container">Container</option>
                      </select>
                    ) : (
                      <span className="capitalize">{pkg.type}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-700">Dimensions (L×W×H)</label>
                  <div className="p-2 border rounded-lg">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={editedOrder.packages[index].dimensions.length}
                          onChange={(e) => {
                            const newPackages = [...editedOrder.packages];
                            newPackages[index] = {
                              ...newPackages[index],
                              dimensions: { ...newPackages[index].dimensions, length: e.target.value }
                            };
                            handleInputChange('packages', newPackages);
                          }}
                          className="w-20 bg-transparent outline-none"
                        />
                        ×
                        <input
                          type="number"
                          value={editedOrder.packages[index].dimensions.width}
                          onChange={(e) => {
                            const newPackages = [...editedOrder.packages];
                            newPackages[index] = {
                              ...newPackages[index],
                              dimensions: { ...newPackages[index].dimensions, width: e.target.value }
                            };
                            handleInputChange('packages', newPackages);
                          }}
                          className="w-20 bg-transparent outline-none"
                        />
                        ×
                        <input
                          type="number"
                          value={editedOrder.packages[index].dimensions.height}
                          onChange={(e) => {
                            const newPackages = [...editedOrder.packages];
                            newPackages[index] = {
                              ...newPackages[index],
                              dimensions: { ...newPackages[index].dimensions, height: e.target.value }
                            };
                            handleInputChange('packages', newPackages);
                          }}
                          className="w-20 bg-transparent outline-none"
                        />
                      </div>
                    ) : (
                      <span>
                        {pkg.dimensions.length}×{pkg.dimensions.width}×{pkg.dimensions.height}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-700">Weight (KG)</label>
                  <div className="p-2 border rounded-lg">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedOrder.packages[index].weight}
                        onChange={(e) => {
                          const newPackages = [...editedOrder.packages];
                          newPackages[index] = { ...newPackages[index], weight: e.target.value };
                          handleInputChange('packages', newPackages);
                        }}
                        className="w-full bg-transparent outline-none"
                      />
                    ) : (
                      <span>{pkg.weight}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-gray-700">Units</label>
                  <div className="p-2 border rounded-lg">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedOrder.packages[index].units}
                        onChange={(e) => {
                          const newPackages = [...editedOrder.packages];
                          newPackages[index] = { ...newPackages[index], units: e.target.value };
                          handleInputChange('packages', newPackages);
                        }}
                        className="w-full bg-transparent outline-none"
                      />
                    ) : (
                      <span>{pkg.units}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;