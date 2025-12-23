
export enum ScreenState {
  TITLE = 'TITLE',
  LOGIN = 'LOGIN',
  MISSION = 'MISSION', // New Screen: Tujuan Pembelajaran
  TUTORIAL = 'TUTORIAL', // New Screen: Cara Bermain
  DIFFICULTY_SELECT = 'DIFFICULTY_SELECT',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  MAP = 'MAP',
  LEVEL_INTRO = 'LEVEL_INTRO',
  LOADING = 'LOADING',
  GAMEPLAY = 'GAMEPLAY',
  EVALUATION = 'EVALUATION',
  REWARD = 'REWARD',
  GALLERY = 'GALLERY'
}

export enum LevelType {
  VOCAB_MATCH = 'VOCAB_MATCH',
  VERSE_ASSEMBLE = 'VERSE_ASSEMBLE',
  COMPREHENSION = 'COMPREHENSION',
  RAPID_FIRE = 'RAPID_FIRE',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  ETHICS = 'ETHICS'
}

export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  perk: string;
}

export interface UserProfile {
  username: string;
  school: string; // New field
  rank: string;
  score: number;
  lastScore?: number;
  levelProgress: number;
  characterId?: string;
  difficulty: Difficulty;
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  type: LevelType;
  description: string;
  maxScore: number;
  image: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}
