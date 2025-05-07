// Define TypeScript types for the application

export interface User {
  username: string;
  height: number; // in cm
  weight: number; // in kg
  goal: 'burn-fat' | 'stay-healthy' | 'slim';
  allergies?: string[];
  sid?: string; // session id
}

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl: string;
  meals: Meal[];
  suitableFor: ('burn-fat' | 'stay-healthy' | 'slim')[];
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time?: string;
  imageUrl?: string;
}

export interface LoggedMeal extends Meal {
  date: string;
  userId: string;
}

export interface Dietician {
  id: string;
  name: string;
  specialization: string;
  experience: number; // in years
  imageUrl: string;
  expertise: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface Quote {
  text: string;
  author: string;
}

export interface ActivityTip {
  title: string;
  description: string;
  imageUrl: string;
  caloriesBurned: number;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
}