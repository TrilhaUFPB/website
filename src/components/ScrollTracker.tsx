"use client";

import { useEffect } from "react";
import { usePostHogTracking } from "@/hooks/usePostHogTracking";

export default function ScrollTracker() {
  const { trackScrollDepth, trackSectionVisibility } = usePostHogTracking();

  useEffect(() => {
    let lastScrollDepth = 0;
    let lastVisibleSections: string[] = [];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track scroll depth at 25%, 50%, 75%, and 100%
      if (scrollDepth >= 25 && lastScrollDepth < 25) {
        trackScrollDepth(25);
      } else if (scrollDepth >= 50 && lastScrollDepth < 50) {
        trackScrollDepth(50);
      } else if (scrollDepth >= 75 && lastScrollDepth < 75) {
        trackScrollDepth(75);
      } else if (scrollDepth >= 100 && lastScrollDepth < 100) {
        trackScrollDepth(100);
      }

      lastScrollDepth = scrollDepth;

      // Track section visibility
      const sections = ["sobre", "depoimentos", "turmas", "quem-somos", "faq"];
      const visibleSections: string[] = [];

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < windowHeight && rect.bottom > 0;
          
          if (isVisible) {
            visibleSections.push(sectionId);
          }
        }
      });

      // Track newly visible sections
      visibleSections.forEach((section) => {
        if (!lastVisibleSections.includes(section)) {
          trackSectionVisibility(section);
        }
      });

      lastVisibleSections = visibleSections;
    };

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [trackScrollDepth, trackSectionVisibility]);

  return null; // This component doesn't render anything
} 