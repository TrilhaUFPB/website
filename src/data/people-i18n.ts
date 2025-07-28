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
    return t(`people.courses.${course}`) as string;
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
      const translatedParts = [];
      let currentPart = '';

      for (const part of parts) {
        currentPart = currentPart ? `${currentPart} ${part}` : part;
        
        // Try to translate the accumulated part
        const translated = t(`people.roles.${currentPart}`) as string;
        
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
    const translatedRole = t(`people.roles.${role}`) as string;
    return translatedRole !== `people.roles.${role}` 
      ? translatedRole 
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
  const peopleOrganization20251 = PeopleData.peopleOrganization20251.map(translatePerson);

  // Create a mapping of courses
  const courses: Record<string, string> = {};
  
  // Type guard to check if an object is a Person
  const isPerson = (obj: unknown): obj is PeopleData.Person => {
    return obj !== null && 
      typeof obj === 'object' && 
      'course' in obj && 
      typeof (obj as PeopleData.Person).course === 'string';
  };
  
  Object.keys(PeopleData).forEach(key => {
    const person = (PeopleData as Record<string, unknown>)[key];
    if (isPerson(person)) {
      courses[person.course] = translateCourse(person.course);
    }
  });

  return {
    ...PeopleData,
    peopleFounders,
    peopleOrganization20241,
    peopleStudents20241,
    peopleOrganization20242,
    peopleOrganization20251,
    courses,
    translatePerson,
    translateCourse,
    translateRole
  };
} 