import React from 'react';
import { X, CheckCircle, Cloud, Activity, Zap, Clock, Shield, Database, Cpu, Battery, Wifi, BarChart } from 'lucide-react';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  currentCategory: {
    name: string;
    description: string;
    price: string;
  };
}

const ExploreModal: React.FC<ExploreModalProps> = ({ 
  isOpen, 
  onClose, 
  activeCategory, 
  currentCategory 
}) => {
  if (!isOpen) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Define specifications for each category
  const categorySpecs = {
    Basic: [
      { text: 'Heart Rate Monitoring (±2 BPM accuracy)', icon: Activity },
      { text: 'Blood Pressure tracking with basic analytics', icon: BarChart },
      { text: 'Temperature Tracking (35-42°C range)', icon: Activity },
      { text: 'Basic AI Analytics for health patterns', icon: Cpu },
      { text: 'Cloud Sync with basic storage', icon: Cloud },
      { text: '50+ Health Parameters monitoring', icon: Database },
      { text: 'Battery life: 24 hours continuous', icon: Battery },
      { text: 'Wi-Fi & Bluetooth connectivity', icon: Wifi },
    ],
    Advanced: [
      { text: 'Advanced AI Diagnostics with neural networks', icon: Zap },
      { text: 'Real-time Alerts for critical parameters', icon: Clock },
      { text: 'Multi-patient Support (up to 10 patients)', icon: Shield },
      { text: 'Advanced Cloud Analytics & reporting', icon: Cloud },
      { text: 'Predictive health risk assessment', icon: Cpu },
      { text: '100+ Comprehensive Parameters', icon: Database },
      { text: 'Medical-grade accuracy certification', icon: CheckCircle },
      { text: 'Enterprise data security compliance', icon: Shield },
    ],
    Multispecialty: [
      { text: 'Full Diagnostic Suite for multiple specialties', icon: Database },
      { text: 'Specialized Modules for Cardiology, Neurology, etc.', icon: Shield },
      { text: 'Enterprise Integration with hospital systems', icon: Cloud },
      { text: 'Custom AI Models for specific conditions', icon: Cpu },
      { text: '24/7 Priority Support with dedicated team', icon: Clock },
      { text: '200+ Advanced Medical Parameters', icon: Database },
      { text: 'Real-time multi-specialty consultations', icon: Zap },
      { text: 'Comprehensive analytics dashboard', icon: BarChart },
    ],
    KIOSK: [
      { text: 'Smart diagnostic pods with AI triage system', icon: Activity },
      { text: 'Connected with Telth cloud & Care Manager suite', icon: Cloud },
      { text: 'Real-time IoMT data sync with Health System', icon: Wifi },
      { text: 'Real-time health reports within 15-20 seconds', icon: Clock },
      { text: 'Medical-grade accuracy certification', icon: CheckCircle },
      { text: 'Affordable per-test pricing model', icon: CheckCircle },
      { text: 'Advanced AI Technology with 100+ parameters', icon: Cpu },
      { text: 'Self-service interface with payment integration', icon: Shield },
    ],
    RemoteICU: [
      { text: 'Smart diagnostic pods with AI triage system', icon: Activity },
      { text: 'Connected with Telth cloud & Care Manager suite', icon: Cloud },
      { text: 'Real-time IoMT data sync with Health System', icon: Wifi },
      { text: 'Real-time health reports within 15-20 seconds', icon: Clock },
      { text: 'Medical-grade accuracy certification', icon: CheckCircle },
      { text: 'Affordable per-test pricing model', icon: CheckCircle },
      { text: 'Advanced AI Technology with 100+ parameters', icon: Cpu },
      { text: 'Self-service interface with payment integration', icon: Shield },
    ]
  };

  // Get specifications for current category, default to Basic if not found
  const specifications = categorySpecs[activeCategory as keyof typeof categorySpecs] || categorySpecs.Basic;

  // Define category-specific highlights
  const categoryHighlights = {
    Basic: { 
      color: 'from-blue-500/10 to-blue-600/10', 
      textColor: 'text-blue-600', 
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      borderColor: 'border-blue-500'
    },
    Advanced: { 
      color: 'from-purple-500/10 to-purple-600/10', 
      textColor: 'text-purple-600', 
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500 hover:bg-purple-600',
      borderColor: 'border-purple-500'
    },
    Multispecialty: { 
      color: 'from-green-500/10 to-green-600/10', 
      textColor: 'text-green-600', 
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-green-500'
    },
    KIOSK: { 
      color: 'from-orange-500/10 to-orange-600/10', 
      textColor: 'text-orange-600', 
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500 hover:bg-orange-600',
      borderColor: 'border-orange-500'
    },
  };

  const highlight = categoryHighlights[activeCategory as keyof typeof categoryHighlights] || categoryHighlights.Basic;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
  <div 
  className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl 
  shadow-2xl border border-gray-200 dark:border-gray-800 
  max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar"
  onClick={(e) => e.stopPropagation()}
>

  
  <div className={`p-6 rounded-t-2xl bg-gradient-to-r ${highlight.color} 
    border-b border-gray-200 dark:border-gray-800 
    sticky top-0 z-20 bg-white dark:bg-gray-900`}> 
         <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 ${highlight.textColor}`}>
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentCategory.name} Specifications
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                   •  {currentCategory.description} 
                  </p>
                </div>
              </div>
            </div>
            {/* Close Button in Header - This one should work */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Specifications List */}
        <div className="p-6">
          <div className="space-y-4">
            {specifications.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div key={index} className="flex items-start gap-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                  {/* Rounded bullet with category color */}
                  <div className={`w-10 h-10 rounded-full ${highlight.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${highlight.iconColor}`} />
                  </div>
                  
                  {/* Specification text */}
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {spec.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category-specific Stats */}
          <div className={`mt-8 p-6 rounded-xl bg-gradient-to-r ${highlight.color} border ${highlight.borderColor}/20`}>
            <h4 className={`font-bold ${highlight.textColor} mb-4`}>Key Highlights</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeCategory === 'Basic' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Parameters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24h</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Battery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Basic</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Analytics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$2,999</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Starting</div>
                  </div>
                </>
              )}
              {activeCategory === 'Advanced' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Parameters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">AI</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Diagnostics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$5,999</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Starting</div>
                  </div>
                </>
              )}
              {activeCategory === 'Multispecialty' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Parameters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Multi</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Specialty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$9,999</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Starting</div>
                  </div>
                </>
              )}
              {activeCategory === 'KIOSK' && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Parameters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">15-20s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Self</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$9,999</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Starting</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Big Close Button */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Click outside the modal or press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreModal;