import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ConfigurationHub from '@/components/ConfigurationHub';
import CertificationsSection from '@/components/CertificationsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className='bg-gradient-to-b from-[#EDE8F7] via-[#F9F7FD] to-[#FFFDF8]'>
        <HeroSection />
        <ConfigurationHub />
        <CertificationsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 MedAI Solutions. All rights reserved. | Advanced AI-Driven Medical Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
