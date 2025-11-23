import { useState } from 'react';
import { Heart, Stethoscope, Activity, Brain, Plus, X, Clock, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const services = [
    {
      id: 'basic-monitoring',
      title: 'Basic Health Monitoring',
      icon: Heart,
      price: '$299/month',
      description: 'Essential health monitoring for individuals and small clinics',
      features: [
        'Real-time vital signs monitoring',
        'Basic AI health insights',
        'Mobile app access',
        'Email alerts',
        '24/7 data recording'
      ],
      details: {
        duration: '12 months minimum',
        support: 'Business hours support',
        users: 'Up to 5 users',
        storage: '1GB data storage'
      }
    },
    {
      id: 'advanced-diagnostics',
      title: 'Advanced AI Diagnostics',
      icon: Brain,
      price: '$799/month',
      description: 'Comprehensive AI-powered diagnostic services for healthcare facilities',
      features: [
        'Advanced AI pattern recognition',
        'Predictive health analytics',
        'Integration with EMR systems',
        'Custom reporting dashboards',
        'Multi-patient monitoring'
      ],
      details: {
        duration: '24 months minimum',
        support: '24/7 priority support',
        users: 'Up to 50 users',
        storage: '10GB data storage'
      }
    },
    {
      id: 'enterprise-solution',
      title: 'Enterprise Healthcare Suite',
      icon: Activity,
      price: '$1,999/month',
      description: 'Complete healthcare management solution for hospitals and large practices',
      features: [
        'Full diagnostic suite',
        'Custom AI model training',
        'Enterprise integrations',
        'Compliance reporting',
        'Dedicated account manager'
      ],
      details: {
        duration: '36 months minimum',
        support: 'Dedicated support team',
        users: 'Unlimited users',
        storage: 'Unlimited data storage'
      }
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine Platform',
      icon: Stethoscope,
      price: '$499/month',
      description: 'Remote healthcare delivery platform with AI assistance',
      features: [
        'Video consultation platform',
        'AI-assisted diagnosis',
        'Remote patient monitoring',
        'Prescription management',
        'Patient portal access'
      ],
      details: {
        duration: '12 months minimum',
        support: '24/7 technical support',
        users: 'Up to 25 providers',
        storage: '5GB data storage'
      }
    }
  ];

  const addToCart = (service: any) => {
    const existingItem = cartItems.find(item => item.id === service.id);
    if (!existingItem) {
      setCartItems([...cartItems, { ...service, quantity: 1 }]);
    }
    setSelectedService(null);
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter(item => item.id !== serviceId));
  };

  return (
    <section id="services" className="py-20 bg-gradient-medical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 ">Our Healthcare Services</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Comprehensive healthcare solutions powered by advanced AI technology. 
            Choose from our range of services designed for healthcare providers of all sizes.
          </p>
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="mb-12">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Selected Services ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-primary-foreground/10 p-3 rounded-lg">
                      <span className="font-medium">{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span>{item.price}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 p-0 hover:bg-primary-foreground/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isInCart = cartItems.some(item => item.id === service.id);
            
            return (
              <Card 
                key={service.id} 
                className={`group hover:shadow-medical transition-all duration-300 hover:-translate-y-1 ${isInCart ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => setSelectedService(service)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant={isInCart ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => isInCart ? removeFromCart(service.id) : addToCart(service)}
                      disabled={isInCart}
                    >
                      {isInCart ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Details Modal */}
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                      <selectedService.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                      <Badge variant="secondary" className="text-lg font-bold mt-1">
                        {selectedService.price}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <p className="text-muted-foreground text-lg">{selectedService.description}</p>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Features Included
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {selectedService.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Duration:</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{selectedService.details.duration}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Users:</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{selectedService.details.users}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Support:</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{selectedService.details.support}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Storage:</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">{selectedService.details.storage}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => addToCart(selectedService)}
                    >
                      Add to Selection
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedService(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServicesSection;