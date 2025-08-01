# PostHog Tracking Implementation

This document outlines all the PostHog tracking events implemented on the main page.

## Tracking Events

### 1. Page Views
- **Event**: `$pageview` (automatic)
- **Properties**: 
  - Automatically captured by PostHog
  - Includes URL, referrer, and other standard properties
- **Trigger**: Automatically on page load (no manual tracking needed)

### 2. Navigation Interactions
- **Event**: `navigation_clicked`
- **Properties**:
  - `section`: "sobre" | "depoimentos" | "turmas" | "quem-somos" | "faq"
  - `page`: "home"
- **Trigger**: When user clicks navigation links

### 3. Language Switching
- **Event**: `language_switched`
- **Properties**:
  - `language`: "pt" | "en"
  - `page`: "home"
- **Trigger**: When user switches language

### 4. Hero Button Interactions
- **Event**: `hero_button_clicked`
- **Properties**:
  - `button`: "learn_more"
  - `page`: "home"
- **Trigger**: When user clicks the hero CTA button

### 5. FAQ Interactions
- **Event**: `faq_interaction`
- **Properties**:
  - `action`: "expand" | "collapse"
  - `questionIndex`: number (for expand)
  - `questionText`: string (for expand) - The actual question text
  - `page`: "home"
- **Trigger**: When user expands/collapses FAQ items

### 6. Turma Section Interactions
- **Event**: `turma_section_interaction`
- **Properties**:
  - `action`: "expand" | "collapse"
  - `section`: "2024.1" | "2024.2"
  - `page`: "home"
- **Trigger**: When user expands/collapses turma sections

### 7. Student Profile Clicks
- **Event**: `student_profile_clicked`
- **Properties**:
  - `studentName`: string
  - `section`: "2024.1" | "2024.2"
  - `page`: "home"
- **Trigger**: When user clicks on student profile images

### 8. Organizer Profile Clicks
- **Event**: `organizer_profile_clicked`
- **Properties**:
  - `organizerName`: string
  - `section`: "2024.1" | "2024.2"
  - `page`: "home"
- **Trigger**: When user clicks on organizer profile images

### 9. Founder Profile Clicks
- **Event**: `founder_profile_clicked`
- **Properties**:
  - `founderName`: string
  - `page`: "home"
- **Trigger**: When user clicks on founder profile images

### 10. Current Member Profile Clicks
- **Event**: `current_member_profile_clicked`
- **Properties**:
  - `memberName`: string
  - `role`: string (current role/position)
  - `page`: "home"
- **Trigger**: When user clicks on current organization member profile images

### 11. Scroll Depth Tracking
- **Event**: `scroll_depth`
- **Properties**:
  - `depth`: 25 | 50 | 75 | 100 (percentage)
  - `page`: "home"
- **Trigger**: When user scrolls to 25%, 50%, 75%, or 100% of the page

### 12. Section Visibility
- **Event**: `section_visible`
- **Properties**:
  - `section`: "sobre" | "depoimentos" | "turmas" | "quem-somos" | "faq"
  - `page`: "home"
- **Trigger**: When a section becomes visible in viewport

## Implementation Details

### Files Modified:
1. `src/hooks/usePostHogTracking.ts` - Main tracking hook
2. `src/components/Hero.tsx` - Hero button tracking
3. `src/components/NavBar.tsx` - Navigation tracking
4. `src/components/LanguageSwitcher.tsx` - Language switching tracking
5. `src/components/FAQ.tsx` - FAQ interactions tracking
6. `src/components/TurmaSection.tsx` - Turma section and profile tracking
7. `src/components/ScrollTracker.tsx` - Scroll depth and section visibility
8. `src/app/page.tsx` - Added ScrollTracker component

### Key Features:
- **Automatic page view tracking** (PostHog default)
- **Throttled scroll tracking** for performance
- **Comprehensive user interaction tracking**
- **Consistent event naming** and property structure
- **Performance optimized** with requestAnimationFrame

## Analytics Insights You Can Get

1. **User Engagement**: Which sections are most viewed
2. **Navigation Patterns**: Most clicked navigation items
3. **Content Interest**: Which FAQ items are most expanded
4. **Student/Organizer Interest**: Which profiles get clicked most
5. **Founder/Current Member Interest**: Which team members get most attention
6. **Language Preferences**: PT vs EN usage
7. **Scroll Behavior**: How far users scroll on the page
8. **Conversion**: Hero button click-through rates

## Testing

To test the tracking:
1. Open browser developer tools
2. Go to Network tab
3. Filter by "posthog" or your PostHog domain
4. Interact with the page and verify events are being sent
5. Check PostHog dashboard for incoming events 