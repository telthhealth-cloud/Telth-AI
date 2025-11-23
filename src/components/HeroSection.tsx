
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, BarChart3, Brain, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import medicalHero from '@/assets/medical-hero.jpg';
import analyticsBg from '@/assets/analytics-bg.jpg';
import basicmodal from '@/assets/basic model.jpg';
import Newdia from '@/assets/Basic_hub_-removebg-preview.png'
import advancehub from '@/assets/advance spec hub.jpg';
import multispechub from '@/assets/Multispec.jpg';
import LightRays from './ui/LightRays';
import BubbleBackground from './ui/BubbleBackground';
import blackhub from '@/assets/HSL Shift Adjustment.png';
import HeroSlideContent from './ui/HeroSlidersection';
import fibre from '@/assets/0_Cityscape_Aerial_View_3840x2160.mp4';
import fibre1 from '@/assets/0_Circuit_Board_Technology_1920x1080.mp4';
import fibre2 from '@/assets/0_Globe_Data_Visualization_3840x2160.mp4';
import fibre3 from '@/assets/5521_Fiber_Optics_Fiber_2048x1080.mp4';
import fibre4 from '@/assets/6916531_Motion_Graphics_Motion_Graphic_3840x2160.mp4'
import fibre5 from '@/assets/7020021_Particle_Light_1920x1080.mp4'
import fibre6 from '@/assets/0_Technology_Circuit_Board_1920x1080.mp4'
import { useNavigate } from 'react-router-dom';


const slides = [
  {
    title: "Advanced AI Medical Solutions",
    text: "Revolutionizing healthcare with cutting-edge artificial intelligence.",
    img: Newdia,
    buttons: (
      <>
<Button onClick={() => {
      document.getElementById("configuration")?.scrollIntoView({ behavior: "smooth" });
    }} size="lg">Explore Products</Button>       
 <Button onClick={() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }} variant="outline" size="lg">Contact Us</Button>      </>
    )
  },
  {
    title: "Intelligent Diagnostic Hub",
    text: "Real-time analytics that assist medical teams with precision insights.",
    img: Newdia,
    buttons: (
      <>
        <Button onClick={() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }} variant="outline" size="lg">Learn More</Button>
        <Button onClick={() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }} variant="outline" size="lg">Talk to Team</Button>
      </>
    )
  },
  {
    title: "Next-Gen Smart Medical Devices",
    text: "Instant results and seamless patient monitoring integrated in one place.",
    img: Newdia,
    buttons: (
      <>
        <Button onClick={() => {
      document.getElementById("configuration")?.scrollIntoView({ behavior: "smooth" });
    }} size="lg" >Explore</Button>
        <Button onClick={() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }} variant="outline" size="lg">Request Demo</Button>
      </>
    )
  }
];


const HeroSection = () => {


  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const imageContainerRef = useRef(null);

  const images = [
    { src: multispechub, alt: "Advanced Medical Analytics Dashboard" },
    { src: advancehub, alt: "Advanced Specification Hub" },
    { src: basicmodal, alt: "Basic Model Interface" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-rotate images for desktop only
  useEffect(() => {
    if (isMobile) return; // Don't auto-rotate on mobile

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isMobile]);

  const features = [
    {
      icon: Brain,
      title: 'AI-Driven Analytics',
      description: 'Advanced machine learning algorithms for precise medical diagnostics'
    },
    {
      icon: BarChart3,
      title: 'Real-time Monitoring',
      description: 'Continuous patient data tracking with instant alerts and insights'
    },
    {
      icon: Shield,
      title: 'Medical Compliance',
      description: 'FDA approved and certified medical-grade solutions'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Lightning-fast processing for critical medical decisions'
    }
  ];

  // Disable parallax on mobile for better performance
  const parallaxEffect = isMobile ? 0 : scrollY * 0.1;
  const imageParallaxEffect = isMobile ? 0 : scrollY * -0.15;
  const imageScaleEffect = isMobile ? 1 : 1 - scrollY * 0.00008;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden ">

      {/* Parallax Background Layers - Disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
 <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src={fibre6} type="video/mp4" />
          </video>
          {/* Background Layer - Slower parallax */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#47c3c7ff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}        
              followMouse={true}     
              mouseInfluence={0.1}   
              noiseAmount={0.1}      
              distortion={0.05}      
              className="custom-rays"
            />
          </div>

          {/* Mid Layer - Medium parallax */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0001})`,
            }}
          >
            <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-float" />
            <div className="absolute top-40 right-20 w-24 h-24 border border-primary/30 rounded-lg animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-primary/25 rounded-full animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 pt-16 md:pt-20 pb-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center w-full">
              <HeroSlideContent slides={slides} interval={8000} />
            </div>
        </div>

        {/* Features Grid - Moved outside the main grid container */}
        <div
          className="mt-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{
            transform: isMobile ? 'none' : `translateY(${scrollY * 0.02}px)`,
          }}
        >
          <div className=" mt-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-4 sm:p-6  rounded-xl border border-border hover:shadow-medical transition-all duration-300"
                  style={{
                    transform: isMobile ? 'none' : `translateY(${scrollY * (0.02 + index * 0.01)}px)`,
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div> 
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-black text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;