import React, { useState, useEffect, useRef } from 'react';

const TelthAILoader = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2
    
    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to TELTH AI</h1>
          <p className="text-xl text-blue-200">Your app content loads here...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
     
      {/* Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-30 blur-xl"
            style={{
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animation: `blobFloat ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Main Text Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div 
          className="relative"
          style={{
            animation: 'textZoomIn 3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Deep 3D Extrusion Layers - creating depth */}
          {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className="absolute inset-0"
              style={{ 
                transform: `translateZ(${-50 - i * 2}px)`,
                opacity: Math.max(0.05, 1 - i * 0.04)
              }}
            >
              <h1 
                className="text-8xl font-black"
                style={{
                  color: `rgb(${30 + i * 3}, ${50 + i * 4}, ${80 + i * 5})`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                TELTH AI
              </h1>
            </div>
          ))}

          {/* Front face shadow for definition */}
          <div className="absolute inset-0 opacity-60 blur-sm" style={{ transform: 'translateZ(-2px)' }}>
            <h1 className="text-8xl font-black text-slate-50">TELTH AI</h1>
          </div>

          {/* Main Text with Paint Fill - Front Face */}
          <div className="relative" style={{ transform: 'translateZ(0px)' }}>
            <h1 
              className="text-8xl font-black text-white relative overflow-hidden"
              
            >
              <span className="relative inline-block">
                TELTH AI
                {/* Paint Fill Effect */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-white overflow-hidden"
                  style={{
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: 'paintFill 2.5s ease-out forwards',
                    animationDelay: '0.5s'
                  }}
                >
                  TELTH AI
                </span>
              </span>
            </h1>
          </div>

          {/* Bottom Glowing Line */}
          <div 
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              bottom: '-20px',
              animation: 'lineExpand 2s ease-out forwards, lineGlow 1.5s ease-in-out infinite',
              animationDelay: '1s, 2s',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 4px 30px rgba(6, 182, 212, 0.6)',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(60deg) translateZ(-10px)'
            }}
          />

          {/* 3D Bottom Line Shadow */}
          <div 
            className="absolute left-0 right-0 h-8 bg-gradient-to-b from-blue-600/50 to-transparent blur-md"
            style={{
              bottom: '-30px',
              animation: 'lineExpand 2s ease-out forwards',
              animationDelay: '1s',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(75deg) translateZ(-15px)'
            }}
          />
        </div>
      </div>

      {/* Loading Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="relative w-64 h-1 bg-slate-800/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              animation: 'progress 4.5s ease-out forwards',
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
            }}
          />
          {/* Bouncing Ball */}
          <div 
            className="absolute top-0 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-lg"
            style={{
              animation: 'ballBounce 0.6s ease-in-out infinite, ballMove 4.5s linear forwards',
              boxShadow: '0 0 15px rgba(34, 211, 238, 0.9), 0 0 30px rgba(6, 182, 212, 0.6)',
              transform: 'translateY(-100%)'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes textZoomIn {
          0% {
            transform: translateZ(-1000px) scale(0.3);
            opacity: 0;
            filter: blur(20px);
          }
          50% {
            opacity: 0.8;
            filter: blur(5px);
          }
          100% {
            transform: translateZ(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes paintFill {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes slideFromLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes lineExpand {
          0% {
            transform: rotateX(60deg) translateZ(-10px) scaleX(0);
            opacity: 0;
          }
          100% {
            transform: rotateX(60deg) translateZ(-10px) scaleX(1);
            opacity: 1;
          }
        }

        @keyframes lineGlow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(204, 94, 226, 0.8), 0 4px 30px rgba(203, 93, 212, 0.6);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 40px rgba(201, 114, 196, 1), 0 4px 50px rgba(207, 123, 233, 0.9);
          }
        }

        @keyframes blobFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-15px, 20px) scale(0.9);
          }
          75% {
            transform: translate(30px, 10px) scale(1.05);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes ballBounce {
          0%, 100% {
            transform: translateY(-15px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes ballMove {
          0% {
            left: 0%;
          }
          100% {
            left: 100%;
          }
        }

        .perspective-1000 {
          perspective: 2000px;
          perspective-origin: center center;
        }
      `}</style>
    </div>
  );
};

export default TelthAILoader;