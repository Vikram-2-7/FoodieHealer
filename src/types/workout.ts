export interface WorkoutCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  targetArea?: string; // For body part highlighting
  workoutCount?: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  type: 'CLASSIC' | '7x4' | 'CUSTOM';
  day: number;
  totalDays: number;
  date: string;
  progress: number;
  exercises: Exercise[];
  thumbnails: string[]; // For the small exercise preview images
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number | null;
  duration: number | null; // in seconds
  image?: string;
  video?: string;
  instructions?: string[];
  targetArea?: string;
}

export interface WorkoutGoal {
  id: string;
  title: string;
  subtitle?: string;
  workoutCount: number;
  image: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface DailyPick {
  id: string;
  title: string;
  duration: string;
  type: string;
  image: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  category: string;
  image: string;
  exercises: Exercise[];
  progress: number;
} 