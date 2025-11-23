import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HeroSlideContent = ({ slides, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [slides.length, interval]);

  const slide = slides[index];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

      {/* LEFT — TEXT */}
      <div className="flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              {slide.text}
            </p>

            <div className="flex gap-4">
              {slide.buttons}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT — IMAGE */}
      <div className="flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={`image-${index}`}
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-contain rounded-2xl"
            initial={{ opacity: 0, scale: 0.95, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -60 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

    </div>
  );
};

export default HeroSlideContent;
