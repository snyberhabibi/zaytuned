// Core types for Zaytuned

export type Language = 'ar' | 'en';
export type ContentMode = 'kids' | 'deep';

export interface Translatable {
  ar: string;
  en: string;
  transliteration: string;
}

export interface City {
  id: string;
  name: Translatable;
  region: Region;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: Translatable;
  heroImage: string;
  population?: {
    pre1948?: number;
    current?: number;
  };
  established?: string;
  status: 'existing' | 'destroyed' | 'occupied';
  sections: CitySection[];
}

export interface Village extends City {
  originalCity?: string; // Parent city reference
  destroyedDate?: string;
  currentSite?: string; // What exists there now
  refugeeCamps?: string[]; // Where residents went
}

export type Region =
  | 'galilee'
  | 'coastal'
  | 'central'
  | 'jerusalem'
  | 'hebron'
  | 'negev'
  | 'gaza';

export interface CitySection {
  type: SectionType;
  content: SectionContent;
}

export type SectionType =
  | 'history'
  | 'traditions'
  | 'tatreez'
  | 'food'
  | 'dialect'
  | 'landmarks'
  | 'sayings'
  | 'famous_people'
  | 'music'
  | 'agriculture'
  | 'before_after';

export interface SectionContent {
  title: Translatable;
  description: Translatable;
  items: ContentItem[];
  media?: Media[];
}

export interface ContentItem {
  id: string;
  title: Translatable;
  description: Translatable;
  image?: string;
  audio?: string;
  kidsVersion?: Translatable; // Simplified for kids mode
  deepDiveContent?: Translatable; // Extended for deep mode
  sources?: string[];
}

export interface Media {
  type: 'image' | 'audio' | 'video';
  url: string;
  caption?: Translatable;
  credit?: string;
}

// Tatreez specific types
export interface TatreezPattern {
  id: string;
  name: Translatable;
  cityId: string;
  meaning: Translatable;
  colors: string[];
  svg: string; // SVG path data
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Dialect types
export interface DialectWord {
  id: string;
  word: Translatable;
  meaning: Translatable;
  cityId: string;
  audio?: string;
  usage: Translatable; // Example sentence
  equivalent?: {
    standardArabic: string;
    otherCities?: Record<string, string>;
  };
}

export interface Proverb {
  id: string;
  text: Translatable;
  meaning: Translatable;
  cityId?: string; // Optional, some are pan-Palestinian
  context: Translatable;
}

// Food types
export interface Recipe {
  id: string;
  name: Translatable;
  cityId: string;
  description: Translatable;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  image: string;
  prepTime: number; // minutes
  cookTime: number;
  servings: number;
  story?: Translatable; // Cultural context/story behind dish
}

export interface Ingredient {
  name: Translatable;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  order: number;
  instruction: Translatable;
  image?: string;
  tip?: Translatable;
}

// Landmark types
export interface Landmark {
  id: string;
  name: Translatable;
  cityId: string;
  type: 'mosque' | 'church' | 'historical' | 'natural' | 'market' | 'other';
  description: Translatable;
  historicalSignificance: Translatable;
  images: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  status: 'standing' | 'destroyed' | 'modified';
  beforeAfter?: {
    before: string;
    after: string;
    description: Translatable;
  };
}

// Famous people
export interface FamousPerson {
  id: string;
  name: Translatable;
  cityId: string;
  birthYear?: number;
  deathYear?: number;
  occupation: Translatable;
  biography: Translatable;
  achievements: Translatable[];
  image?: string;
  quotes?: Translatable[];
}

// Timeline types
export interface TimelineEvent {
  id: string;
  date: string;
  title: Translatable;
  description: Translatable;
  cityId?: string;
  type: 'political' | 'cultural' | 'conflict' | 'achievement';
  image?: string;
}

// Gamification types
export interface UserProgress {
  id: string;
  visitorId: string;
  citiesCompleted: string[];
  citiesInProgress: Record<string, CityProgress>;
  badges: Badge[];
  passportStamps: PassportStamp[];
  quizScores: QuizScore[];
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CityProgress {
  cityId: string;
  sectionsViewed: SectionType[];
  quizzesTaken: string[];
  lastVisited: Date;
  completionPercentage: number;
}

export interface Badge {
  id: string;
  name: Translatable;
  description: Translatable;
  icon: string;
  earnedAt: Date;
  type: 'city' | 'quiz' | 'explorer' | 'special';
}

export interface PassportStamp {
  cityId: string;
  earnedAt: Date;
  design: string; // Reference to stamp SVG
}

export interface QuizScore {
  quizId: string;
  cityId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

export interface Quiz {
  id: string;
  cityId: string;
  title: Translatable;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: Translatable;
  options: Translatable[];
  correctIndex: number;
  explanation: Translatable;
  image?: string;
  audio?: string;
}

// Heritage Card types
export interface HeritageCard {
  id: string;
  userId: string;
  cities: string[];
  generatedAt: Date;
  design: 'classic' | 'tatreez' | 'olive';
  imageUrl: string;
}
