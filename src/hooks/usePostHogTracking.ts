"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

export const usePostHogTracking = () => {
  const posthog = usePostHog();
  const isDebug = process.env.NODE_ENV === "development";

  // Track navigation clicks
  const trackNavigationClick = useCallback((section: string) => {
    const eventData = {
      section,
      page: "home",
      version: "v2",
    };
    posthog?.capture("navigation_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: navigation_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track language switching
  const trackLanguageSwitch = useCallback((language: string) => {
    const eventData = {
      language,
      page: "home",
      version: "v2",
    };
    posthog?.capture("language_switched", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: language_switched", eventData);
    }
  }, [posthog, isDebug]);

  // Track hero button click
  const trackHeroButtonClick = useCallback(() => {
    const eventData = {
      button: "learn_more",
      page: "home",
      version: "v2",
    };
    posthog?.capture("hero_button_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: hero_button_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track FAQ interactions
  const trackFAQInteraction = useCallback((action: string, questionIndex?: number, questionText?: string) => {
    const eventData = {
      action, // "expand", "collapse"
      questionIndex,
      questionText,
      page: "home",
      version: "v2",
    };
    posthog?.capture("faq_interaction", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: faq_interaction", eventData);
    }
  }, [posthog, isDebug]);

  // Track turma section interactions
  const trackTurmaSectionInteraction = useCallback((action: string, section: string) => {
    const eventData = {
      action, // "expand", "collapse"
      section, // "2024.1", "2024.2"
      page: "home",
      version: "v2",
    };
    posthog?.capture("turma_section_interaction", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: turma_section_interaction", eventData);
    }
  }, [posthog, isDebug]);

  // Track student profile clicks
  const trackStudentProfileClick = useCallback((studentName: string, section: string) => {
    const eventData = {
      studentName,
      section, // "2024.1", "2024.2"
      page: "home",
      version: "v2",
    };
    posthog?.capture("student_profile_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: student_profile_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track organizer profile clicks
  const trackOrganizerProfileClick = useCallback((organizerName: string, section: string) => {
    const eventData = {
      organizerName,
      section, // "2024.1", "2024.2"
      page: "home",
      version: "v2",
    };
    posthog?.capture("organizer_profile_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: organizer_profile_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track founder profile clicks
  const trackFounderProfileClick = useCallback((founderName: string) => {
    const eventData = {
      founderName,
      page: "home",
      version: "v2",
    };
    posthog?.capture("founder_profile_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: founder_profile_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track current member profile clicks
  const trackCurrentMemberProfileClick = useCallback((memberName: string, role: string) => {
    const eventData = {
      memberName,
      role,
      page: "home",
      version: "v2",
    };
    posthog?.capture("current_member_profile_clicked", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: current_member_profile_clicked", eventData);
    }
  }, [posthog, isDebug]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    const eventData = {
      depth,
      page: "home",
      version: "v2",
    };
    posthog?.capture("scroll_depth", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: scroll_depth", eventData);
    }
  }, [posthog, isDebug]);

  // Track section visibility
  const trackSectionVisibility = useCallback((section: string) => {
    const eventData = {
      section,
      page: "home",
      version: "v2",
    };
    posthog?.capture("section_visible", eventData);
    if (isDebug) {
      console.log("📊 PostHog Event: section_visible", eventData);
    }
  }, [posthog, isDebug]);

  // Track paper card clicks on /papers
  const trackPaperClick = useCallback(
    (
      paper: { slug: string; title: string; tag: string; lang: string; author: string },
      position: number
    ) => {
      const eventData = {
        paperSlug: paper.slug,
        paperTitle: paper.title,
        paperTag: paper.tag,
        paperLang: paper.lang,
        paperAuthor: paper.author,
        position,
        page: "papers",
        version: "v2",
      };
      posthog?.capture("paper_card_clicked", eventData);
      if (isDebug) {
        console.log("📊 PostHog Event: paper_card_clicked", eventData);
      }
    },
    [posthog, isDebug]
  );

  return {
    trackNavigationClick,
    trackLanguageSwitch,
    trackHeroButtonClick,
    trackFAQInteraction,
    trackTurmaSectionInteraction,
    trackStudentProfileClick,
    trackOrganizerProfileClick,
    trackFounderProfileClick,
    trackCurrentMemberProfileClick,
    trackScrollDepth,
    trackSectionVisibility,
    trackPaperClick,
  };
}; 