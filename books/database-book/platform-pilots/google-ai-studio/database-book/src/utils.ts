import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Chapter, SectionType } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadingTime(chapter: Chapter, sectionId: SectionType): number {
  let contentText = "";
  
  switch (sectionId) {
    case 'intro':
      contentText = chapter.introduction || "";
      break;
    case 'concepts':
      contentText = (chapter.concepts?.title || "") + " " + (chapter.concepts?.subsections || []).map(sub => `${sub.title} ${sub.content}`).join(" ");
      break;
    case 'build':
      contentText = chapter.build || "";
      break;
    case 'questions':
      contentText = chapter.questions || "";
      break;
    case 'terms':
      contentText = (chapter.terms || []).map(t => `${t.term} ${t.definition}`).join(" ");
      break;
    case 'rat':
      // Include all question text, options, and explanation text
      contentText = (chapter.rat || []).map(q => `${q.question} ${(q.options || []).join(" ")} ${q.explanation}`).join(" ");
      break;
    default:
      contentText = "";
  }
  
  const words = contentText.trim().split(/\s+/).filter(Boolean).length;
  // Standard reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200);
  
  return Math.max(1, minutes);
}

