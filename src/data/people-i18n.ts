'use client';

import { useTranslation } from '@/hooks/useTranslation';
import * as PeopleData from './people';

/**
 * Translates a course name using the current locale
 */
export function useTranslatedPeople() {
  const { t, locale } = useTranslation();

  /**
   * Translates a course name
   */
  const translateCourse = (course: string): string => {
    return t(`people.courses.${course}`);
  };

  /**
   * Translates a role
   */
  const translateRole = (role: string): string => {
    // If the role contains multiple positions separated by pipes, translate each one
    if (role.includes('|')) {
      return role.split('|').map(part => translateRole(part.trim())).join(' | ');
    }
    
    // Check if it's a compound role like "Software Engineer" + "Company"
    const parts = role.split(/\s+(?=[A-Z])/);
    if (parts.length > 1) {
      // For roles like "Software Engineer Intern Zoox", we want to translate "Software Engineer Intern"
      // but keep "Zoox" as is
      let translatedParts = [];
      let currentPart = '';

      for (const part of parts) {
        currentPart = currentPart ? `${currentPart} ${part}` : part;
        
        // Try to translate the accumulated part
        const translated = t(`people.roles.${currentPart}`);
        
        // If translation successful (not same as key), add it and reset
        if (translated !== `people.roles.${currentPart}`) {
          translatedParts.push(translated);
          currentPart = '';
        }
      }

      // Add any remaining part
      if (currentPart) {
        translatedParts.push(currentPart);
      }

      return translatedParts.join(' ');
    }

    // Simple role, just translate directly
    return t(`people.roles.${role}`) !== `people.roles.${role}` 
      ? t(`people.roles.${role}`) 
      : role;
  };

  /**
   * Returns a translated person
   */
  const translatePerson = (person: PeopleData.Person): PeopleData.Person => {
    if (locale === 'pt') return person; // No translation needed for Portuguese

    return {
      ...person,
      course: translateCourse(person.course),
      role: person.role ? translateRole(person.role) : person.role,
      pos: person.pos.map(translateRole)
    };
  };

  // Create translated versions of all the people collections
  const peopleFounders = PeopleData.peopleFounders.map(translatePerson);
  const peopleOrganization20241 = PeopleData.peopleOrganization20241.map(translatePerson);
  const peopleStudents20241 = PeopleData.peopleStudents20241.map(translatePerson);
  const peopleOrganization20242 = PeopleData.peopleOrganization20242.map(translatePerson);

  // Create a mapping of courses
  const courses: Record<string, string> = {};
  Object.keys(PeopleData).forEach(key => {
    const person = (PeopleData as any)[key];
    if (person && typeof person === 'object' && person.course) {
      courses[person.course] = translateCourse(person.course);
    }
  });

  return {
    ...PeopleData,
    peopleFounders,
    peopleOrganization20241,
    peopleStudents20241,
    peopleOrganization20242,
    courses,
    translatePerson,
    translateCourse,
    translateRole
  };
} 