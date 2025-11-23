import { Award, Shield, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import certificationsImg from '@/assets/certifications.jpg';

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'FDA Approved',
      description: 'Food and Drug Administration certification for medical devices',
      icon: Shield,
      validity: '2024-2027'
    },
    {
      title: 'ISO 13485',
      description: 'Quality management systems for medical devices',
      icon: Award,
      validity: '2024-2027'
    },
    {
      title: 'CE Marking',
      description: 'European Conformity certification for medical equipment',
      icon: CheckCircle,
      validity: '2024-2029'
    },
    {
      title: 'HIPAA Compliant',
      description: 'Health Insurance Portability and Accountability Act compliance',
      icon: Star,
      validity: 'Ongoing'
    },
    {
      title: 'IEC 62304',
      description: 'Medical device software lifecycle processes',
      icon: Shield,
      validity: '2024-2026'
    },
    {
      title: 'ISO 27001',
      description: 'Information security management systems',
      icon: Award,
      validity: '2024-2027'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-[#C9CDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Certifications & Compliance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our medical AI solutions meet the highest industry standards and regulatory requirements,
            ensuring safety, quality, and reliability in healthcare environments.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <Card
                key={index}
                className="
                  group transition-all duration-300 hover:-translate-y-1
                  bg-white/10 backdrop-blur-lg border-white
                  shadow-xl hover:shadow-2xl
                  rounded-2xl ring-1 ring-black/5
                "
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded border-white">
                          Valid: {cert.validity}
                        </span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-secondary px-6 py-3 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">
              All certifications regularly audited and maintained
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
