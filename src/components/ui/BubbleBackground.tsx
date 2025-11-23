// BubbleBackground.jsx
import React, { useMemo } from "react";

const BubbleBackground = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.3,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
    }));
  }, []); // <— stays fixed forever

  return (
    <div className="bubble-floating-container pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble-floating"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            transform: `scale(${b.scale})`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
