
export enum ScreenState {
  TITLE = 'TITLE',
  LOGIN = 'LOGIN',
  DIFFICULTY_SELECT = 'DIFFICULTY_SELECT',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  MAP = 'MAP',
  LEVEL_INTRO = 'LEVEL_INTRO',
  LOADING = 'LOADING', // Added Loading State
  GAMEPLAY = 'GAMEPLAY',
  EVALUATION = 'EVALUATION',
  REWARD = 'REWARD',
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
  HARD = 'HARD'
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
  rank: string;
  score: number;
  lastScore?: number; // New field for previous run score
  levelProgress: number; // 0, 1, 2, 3, 4
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
  image: string; // New field for Level Visualization
}

export interface VocabPair {
  id: string;
  arabic: string;
  meaning: string;
}

export interface VersePart {
  id: string;
  text: string;
  order: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}
