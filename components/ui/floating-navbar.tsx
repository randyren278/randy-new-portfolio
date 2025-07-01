"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  alwaysVisible = false, // Add prop to make it always visible
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
  alwaysVisible?: boolean;
}) => {
  // If alwaysVisible is true, skip all scroll logic
  if (alwaysVisible) {
    return (
      <div
        className={cn(
          "flex max-w-fit fixed bottom-6 inset-x-0 mx-auto border border-white/10 rounded-2xl bg-white/2 backdrop-blur-md shadow-2xl z-[5000] px-4 py-3 items-center justify-center space-x-3",
          className
        )}
      >
        {navItems.map((navItem, idx: number) => (
          <button
            key={`nav-item-${idx}`}
            onClick={navItem.onClick}
            className={cn(
              "w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center transition-all duration-200 group hover:bg-white/10 hover:scale-110"
            )}
          >
            <span className="text-white/60 hover:text-white group-hover:text-white transition-colors">
              {navItem.icon}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Original scroll-based logic for when alwaysVisible is false
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() || 0);
      
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 100 }}
        animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed bottom-6 inset-x-0 mx-auto border border-white/20 rounded-full bg-white/10 backdrop-blur-md shadow-2xl z-[5000] px-6 py-3 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem, idx: number) => (
          <button
            key={`nav-item-${idx}`}
            onClick={navItem.onClick}
            className={cn(
              "relative text-white/80 hover:text-white items-center flex space-x-2 transition-all duration-200 hover:scale-110"
            )}
          >
            <span className="block">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};