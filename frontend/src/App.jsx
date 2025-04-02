import React, { useState, useEffect } from 'react';
import { Ship, Plane, History, MapPin, Calendar, Package, Plus, MinusCircle, PlusCircle } from 'lucide-react';

function App() {
  const [transportMode, setTransportMode] = useState('ocean');
  const [searchByTotal, setSearchByTotal] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [customsClearance, setCustomsClearance] = useState(false);
  const [dangerousShipment, setDangerousShipment] = useState(false);
  const [readyDate, setReadyDate] = useState('2025-03-18');
  const [packages, setPackages] = useState([
    {
      id: 1,
      type: 'Pallets/Boxes',
      subType: 'Pallet',
      length: '',
      width: '',
      height: '',
      unit: 'CM',
      weight: '',
      weightUnit: 'KG',
      quantity: 1
    }
  ]);

  const calculateVolume = (pkg) => {
    if (!pkg.length || !pkg.width || !pkg.height) return 0;
    const volume = (parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height)) / 1000000; // Convert cm³ to m³
    return volume * pkg.quantity;
  };

  const calculateTotalVolume = () => {
    return packages.reduce((total, pkg) => total + calculateVolume(pkg), 0).toFixed(2);
  };

  const calculateTotalWeight = () => {
    return packages.reduce((total, pkg) => {
      const weight = pkg.weight ? parseFloat(pkg.weight) * pkg.quantity : 0;
      return total + weight;
    }, 0).toFixed(2);
  };

  const calculateTotalUnits = () => {
    return packages.reduce((total, pkg) => total + pkg.quantity, 0);
  };

  const handleQuantityChange = (index, change) => {
    setPackages(packages.map((pkg, i) => {
      if (i === index) {
        const newQuantity = Math.max(1, pkg.quantity + change);
        return { ...pkg, quantity: newQuantity };
      }
      return pkg;
    }));
  };

  const handleAddRow = () => {
    setPackages([...packages, {
      id: Date.now(),
      type: 'Pallets/Boxes',
      subType: 'Pallet',
      length: '',
      width: '',
      height: '',
      unit: 'CM',
      weight: '',
      weightUnit: 'KG',
      quantity: 1
    }]);
  };

  const handleInputChange = (index, field, value) => {
    setPackages(packages.map((pkg, i) => {
      if (i === index) {
        return { ...pkg, [field]: value };
      }
      return pkg;
    }));
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-shipping">
      <div className="min-h-screen bg-gradient-to-b from-blue-400/50 to-blue-600/50 backdrop-blur-sm p-6">
        <div className="max-w-7xl mx-auto glass-effect rounded-lg shadow-xl p-6 animate-fade-in">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Create Shipment </h1>
          
          {/* Transport Mode Selection */}
          <div className="flex gap-4 mb-6">
            
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                transportMode === 'air' ? 'bg-blue-500 text-white' : 'bg-white/80'
              }`}
              onClick={() => setTransportMode('air')}
            >
              <Plane size={20} /> Air
            </button>
            
          </div>

          {/* Pickup and Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-gray-700">Pick up from</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-white/80">
                    <MapPin size={20} className="text-gray-400" />
                    <select className="w-full bg-transparent outline-none">
                      <option>Factory / Warehouse</option>
                    </select>
                  </div>
                </div>
                <input type="text" placeholder="Pick up address" className="flex-1 p-2 border rounded-lg bg-white/80" />
                <input type="text" placeholder="Postal Code" className="w-32 p-2 border rounded-lg bg-white/80" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700">Deliver to</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-white/80">
                    <MapPin size={20} className="text-gray-400" />
                    <select className="w-full bg-transparent outline-none">
                      <option>Factory / Warehouse</option>
                    </select>
                  </div>
                </div>
                <input type="text" placeholder="Delivery Address" className="flex-1 p-2 border rounded-lg bg-white/80" />
                <input type="text" placeholder="Postal Code" className="w-32 p-2 border rounded-lg bg-white/80" />
              </div>
            </div>
          </div>

          {/* Ready Date */}
          <div className="mb-6">
            <label className="text-gray-700">Shipment Date</label>
            <div className="flex items-center gap-2 p-2 border rounded-lg w-52 bg-white/80">
              <Calendar size={20} className="text-gray-400" />
              <input 
                type="date" 
                value={readyDate}
                onChange={(e) => setReadyDate(e.target.value)}
                className="outline-none bg-transparent w-full"
              />
            </div>
          </div>

          

          {/* Package Details */}
          <div className="space-y-4 mb-6">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="grid grid-cols-6 gap-4 items-center animate-fade-in bg-white/50 p-4 rounded-lg">
                <div className="col-span-1">
                  <label className="text-gray-700">Package Type</label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-white/80">
                    <Package size={20} className="text-gray-400" />
                    <select 
                      className="w-full bg-transparent outline-none"
                      value={pkg.type}
                      onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                    >
                      <option>Pallets/Boxes</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-gray-700">Type</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white/80"
                    value={pkg.subType}
                    onChange={(e) => handleInputChange(index, 'subType', e.target.value)}
                  >
                    <option>Pallet</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-700">Dimension (LxWxH Per Unit)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="L" 
                      className="w-20 p-2 border rounded-lg bg-white/80"
                      value={pkg.length}
                      onChange={(e) => handleInputChange(index, 'length', e.target.value)}
                    />
                    <input 
                      type="number" 
                      placeholder="W" 
                      className="w-20 p-2 border rounded-lg bg-white/80"
                      value={pkg.width}
                      onChange={(e) => handleInputChange(index, 'width', e.target.value)}
                    />
                    <input 
                      type="number" 
                      placeholder="H" 
                      className="w-20 p-2 border rounded-lg bg-white/80"
                      value={pkg.height}
                      onChange={(e) => handleInputChange(index, 'height', e.target.value)}
                    />
                    <select 
                      className="w-20 p-2 border rounded-lg bg-white/80"
                      value={pkg.unit}
                      onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                    >
                      <option>CM</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-gray-700">Weight</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="0" 
                      className="w-24 p-2 border rounded-lg bg-white/80"
                      value={pkg.weight}
                      onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                    />
                    <select 
                      className="w-20 p-2 border rounded-lg bg-white/80"
                      value={pkg.weightUnit}
                      onChange={(e) => handleInputChange(index, 'weightUnit', e.target.value)}
                    >
                      <option>KG</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="text-gray-700"># of units</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(index, -1)}>
                      <MinusCircle size={20} className="text-blue-600" />
                    </button>
                    <input 
                      type="text" 
                      value={pkg.quantity} 
                      className="w-12 p-2 border rounded-lg text-center bg-white/80" 
                      readOnly 
                    />
                    <button onClick={() => handleQuantityChange(index, 1)}>
                      <PlusCircle size={20} className="text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button 
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
              onClick={handleAddRow}
            >
              <Plus size={20} /> Add A Row
            </button>
          </div>

          {/* Shipment Summary */}
          <div className="flex gap-4 mb-6 text-sm bg-blue-50 p-4 rounded-lg">
            <div>
              <span className="font-semibold">Total Shipment</span>
            </div>
            <div>
              <span className="font-semibold">Volume:</span> {calculateTotalVolume()} CBM
            </div>
            <div>
              <span className="font-semibold">Weight:</span> {calculateTotalWeight()} KG
            </div>
            <div>
              <span className="font-semibold">Units:</span> {calculateTotalUnits()}
            </div>
          </div>

          
            </div classname="flex justify-center">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all transform hover:scale-105">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
