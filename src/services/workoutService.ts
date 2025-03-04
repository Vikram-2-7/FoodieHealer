import { WorkoutCategory, Workout, Exercise } from '../types/workout';

class WorkoutService {
  async getWorkoutCategories(): Promise<WorkoutCategory[]> {
    return [
      {
        id: '1',
        name: 'Strength',
        icon: 'dumbbell',
        color: '#FF6B6B',
      },
      {
        id: '2',
        name: 'Cardio',
        icon: 'run',
        color: '#4ECDC4',
      },
      {
        id: '3',
        name: 'Flexibility',
        icon: 'yoga',
        color: '#45B7D1',
      },
      {
        id: '4',
        name: 'HIIT',
        icon: 'lightning-bolt',
        color: '#96CEB4',
      },
      {
        id: '5',
        name: 'Core',
        icon: 'abs',
        color: '#FFEEAD',
      }
    ];
  }

  async getWorkouts(): Promise<Workout[]> {
    return [
      {
        id: '1',
        title: 'Full Body Strength',
        description: 'Complete body workout targeting all major muscle groups',
        duration: '45 mins',
        difficulty: 'Intermediate',
        calories: 400,
        category: 'Strength',
        image: 'https://your-image-url.com/strength.jpg',
        exercises: [
          {
            id: '1',
            name: 'Push-ups',
            sets: 3,
            reps: 12,
            duration: null,
          },
          // Add more exercises
        ],
        progress: 0,
      },
      // Add more workouts
    ];
  }

  async getRecommendedWorkouts(): Promise<Workout[]> {
    // Implementation for recommended workouts
    return [];
  }

  async getTrendingWorkouts(): Promise<Workout[]> {
    // Implementation for trending workouts
    return [];
  }
}

export const workoutService = new WorkoutService(); 