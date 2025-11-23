import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

// Sample device data
const hubDevices = {
  Basic: [
    {
      id: "thermometer",
      name: "Digital Thermometer",
      description: "High-precision temperature monitoring",
      mrp: 299,
      discountPercent: 15,
      finalPrice: 254,
      imageSrc: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      specs: ["±0.1°C accuracy", "Fast response", "Memory recall"],
    },
    {
      id: "doppler",
      name: "Foetal Doppler",
      description: "Fetal heart rate monitoring device",
      mrp: 1499,
      discountPercent: 20,
      finalPrice: 1199,
      imageSrc: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
      specs: ["2MHz probe", "LCD display", "Built-in speaker"],
    },
    {
      id: "spirometer",
      name: "Spirometer",
      description: "Lung function testing device with advanced features",
      mrp: 2499,
      discountPercent: 10,
      finalPrice: 2249,
      imageSrc: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop",
      specs: ["FEV1/FVC measurement", "Portable design", "USB connectivity"],
    },
    {
      id: "stethoscope",
      name: "Digital Stethoscope",
      description: "Advanced acoustic monitoring",
      mrp: 3999,
      discountPercent: 25,
      finalPrice: 2999,
      imageSrc: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop",
      specs: ["40x amplification", "Noise reduction", "Recording capability"],
    },
    {
      id: "pulse-oximeter",
      name: "Pulse Oximeter",
      description: "SpO2 and heart rate monitor",
      mrp: 899,
      discountPercent: 15,
      finalPrice: 764,
      imageSrc: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      specs: ["OLED display", "Low battery indicator", "Auto power-off"],
    },
    {
      id: "bp-monitor",
      name: "BP Monitor",
      description: "Automatic blood pressure monitoring system",
      mrp: 1299,
      discountPercent: 18,
      finalPrice: 1065,
      imageSrc: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop",
      specs: ["Automatic inflation", "Irregular heartbeat", "Memory storage"],
    },
    {
      id: "glucometer",
      name: "Glucometer",
      description: "Blood glucose monitoring device with fast results",
      mrp: 799,
      discountPercent: 20,
      finalPrice: 639,
      imageSrc: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=300&fit=crop",
      specs: ["5-second results", "Small blood sample", "Test strip ejector"],
    },
  ],
};

const HubDevicesCards = () => {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [selectedModalDevice, setSelectedModalDevice] = useState(null);
  const [activeCategory] = useState("Basic");

  const currentHubDevices = hubDevices[activeCategory] || [];

  const toggleDeviceSelection = (deviceId) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Main Card Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Hub Devices</h2>
            </div>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
              {selectedDevices.length} selected
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="p-6 overflow-x-auto scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="flex gap-5 pb-2">
            {/* First 5 Cards */}
            {currentHubDevices.slice(0, 5).map((device) => {
              const isSelected = selectedDevices.includes(device.id);

              return (
                <div
                  key={device.id}
                  onClick={() => toggleDeviceSelection(device.id)}
                  className={`flex-shrink-0 w-[200px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${isSelected ? 'scale-105' : ''}`}
                  style={{ minWidth: '200px' }}
                >
                  <div className={`relative rounded-2xl overflow-hidden h-full
                    ${isSelected 
                      ? 'ring-4 ring-blue-500 shadow-xl shadow-blue-200' 
                      : 'shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
                      boxShadow: isSelected 
                        ? '0 8px 32px rgba(59, 130, 246, 0.3)'
                        : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                    }}
                  >
                    {/* Image Container - Fixed 120px height */}
                    <div className="w-full h-[120px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                      <img
                        src={device.imageSrc}
                        alt={device.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details Overlay - 5px above image */}
                    <div className="relative -mt-[5px] mx-2 mb-2">
                      <div 
                        className="backdrop-blur-xl bg-white/80 rounded-xl p-3 shadow-lg border border-white/50"
                        style={{
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <h3 className="text-sm font-bold text-gray-800 truncate text-center mb-1">
                          {device.name}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 text-center mb-2">
                          ₹{device.finalPrice}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2 text-center leading-relaxed">
                          {device.description}
                        </p>

                        {device.description?.length > 50 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModalDevice(device);
                            }}
                            className="text-xs text-blue-600 font-semibold mt-2 hover:text-blue-700 hover:underline block mx-auto transition-colors"
                          >
                            See more
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* See More Card */}
            {currentHubDevices.length > 5 && (
              <div
                onClick={() => setShowAllDevices(true)}
                className="flex-shrink-0 w-[200px] h-[200px] cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ minWidth: '200px' }}
              >
                <div 
                  className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3"
                  style={{
                    background: 'linear-gradient(145deg, #e0e0e0, #ffffff)',
                    boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-bold text-white">+</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">See More</p>
                  <p className="text-xs text-gray-500">{currentHubDevices.length - 5} more devices</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All Devices Modal */}
      {showAllDevices && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[85vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">All Hub Devices</h2>
              <button
                onClick={() => setShowAllDevices(false)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 hover:text-red-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-88px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {currentHubDevices.map((device) => {
                  const isSelected = selectedDevices.includes(device.id);
                  return (
                    <div
                      key={device.id}
                      onClick={() => toggleDeviceSelection(device.id)}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105
                        ${isSelected ? 'scale-105' : ''}`}
                    >
                      <div className={`relative rounded-2xl overflow-hidden
                        ${isSelected 
                          ? 'ring-4 ring-blue-500 shadow-xl shadow-blue-200' 
                          : 'shadow-lg hover:shadow-xl'
                        }`}
                        style={{
                          background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
                          boxShadow: isSelected 
                            ? '0 8px 32px rgba(59, 130, 246, 0.3)'
                            : '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff'
                        }}
                      >
                        {/* Image */}
                        <div className="w-full h-[120px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                          <img
                            src={device.imageSrc}
                            alt={device.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="relative -mt-[5px] mx-2 mb-2">
                          <div 
                            className="backdrop-blur-xl bg-white/80 rounded-xl p-3 shadow-lg border border-white/50"
                          >
                            <h3 className="text-sm font-bold text-gray-800 truncate text-center">
                              {device.name}
                            </h3>
                            <p className="text-base font-bold text-blue-600 text-center mt-1">
                              ₹{device.finalPrice}
                            </p>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>  
            </div>  
          </div>  
        </div>
      )}

      {/* Device Details Modal */}
      {selectedModalDevice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedModalDevice.name}</h3>
              <button
                onClick={() => setSelectedModalDevice(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed">{selectedModalDevice.description}</p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-2xl font-bold text-blue-600">₹{selectedModalDevice.finalPrice}</p>
              <p className="text-sm text-gray-500 line-through">₹{selectedModalDevice.mrp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubDevicesCards;