"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

export const usePostHogTracking = () => {
  const posthog = usePostHog();

  // Track navigation clicks
  const trackNavigationClick = useCallback((section: string) => {
    posthog?.capture("navigation_clicked", {
      section,
      page: "home",
    });
  }, [posthog]);

  // Track language switching
  const trackLanguageSwitch = useCallback((language: string) => {
    posthog?.capture("language_switched", {
      language,
      page: "home",
    });
  }, [posthog]);

  // Track hero button click
  const trackHeroButtonClick = useCallback(() => {
    posthog?.capture("hero_button_clicked", {
      button: "learn_more",
      page: "home",
    });
  }, [posthog]);

  // Track FAQ interactions
  const trackFAQInteraction = useCallback((action: string, questionIndex?: number, questionText?: string) => {
    posthog?.capture("faq_interaction", {
      action, // "expand", "collapse"
      questionIndex,
      questionText,
      page: "home",
    });
  }, [posthog]);

  // Track turma section interactions
  const trackTurmaSectionInteraction = useCallback((action: string, section: string) => {
    posthog?.capture("turma_section_interaction", {
      action, // "expand", "collapse"
      section, // "2024.1", "2024.2"
      page: "home",
    });
  }, [posthog]);

  // Track student profile clicks
  const trackStudentProfileClick = useCallback((studentName: string, section: string) => {
    posthog?.capture("student_profile_clicked", {
      studentName,
      section, // "2024.1", "2024.2"
      page: "home",
    });
  }, [posthog]);

  // Track organizer profile clicks
  const trackOrganizerProfileClick = useCallback((organizerName: string, section: string) => {
    posthog?.capture("organizer_profile_clicked", {
      organizerName,
      section, // "2024.1", "2024.2"
      page: "home",
    });
  }, [posthog]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    posthog?.capture("scroll_depth", {
      depth,
      page: "home",
    });
  }, [posthog]);

  // Track section visibility
  const trackSectionVisibility = useCallback((section: string) => {
    posthog?.capture("section_visible", {
      section,
      page: "home",
    });
  }, [posthog]);

  return {
    trackNavigationClick,
    trackLanguageSwitch,
    trackHeroButtonClick,
    trackFAQInteraction,
    trackTurmaSectionInteraction,
    trackStudentProfileClick,
    trackOrganizerProfileClick,
    trackScrollDepth,
    trackSectionVisibility,
  };
}; 