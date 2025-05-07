import { MealPlan, Dietician, Quote, ActivityTip } from '../utils/types';

export const motivationalQuotes: Quote[] = [
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil"
  },
  {
    text: "Health is not about the weight you lose, but about the life you gain.",
    author: "Dr. Josh Axe"
  },
  {
    text: "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.",
    author: "Ann Wigmore"
  },
  {
    text: "Wellness is the complete integration of body, mind, and spirit. The realization that everything we do, think, feel, and believe has an effect on our state of health.",
    author: "Greg Anderson"
  }
];

export const activityTips: ActivityTip[] = [
  {
    title: "Morning Yoga",
    description: "Start your day with 20 minutes of gentle yoga to improve flexibility and focus.",
    imageUrl: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg",
    caloriesBurned: 120,
    durationMinutes: 20,
    intensity: "low"
  },
  {
    title: "Lunchtime Walk",
    description: "A 30-minute brisk walk during lunch break can boost your mood and metabolism.",
    imageUrl: "https://images.pexels.com/photos/775417/pexels-photo-775417.jpeg",
    caloriesBurned: 150,
    durationMinutes: 30,
    intensity: "medium"
  },
  {
    title: "HIIT Workout",
    description: "15 minutes of high-intensity interval training for maximum calorie burn.",
    imageUrl: "https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg",
    caloriesBurned: 200,
    durationMinutes: 15,
    intensity: "high"
  },
  {
    title: "Evening Stretch",
    description: "Wind down with 10 minutes of stretching to improve recovery and sleep quality.",
    imageUrl: "https://images.pexels.com/photos/3822615/pexels-photo-3822615.jpeg",
    caloriesBurned: 50,
    durationMinutes: 10,
    intensity: "low"
  }
];

export const mealPlans: MealPlan[] = [
  {
    id: "mp1",
    title: "Fat Burning Kickstart",
    description: "High protein, moderate fat, and low carb meals to kickstart fat burning.",
    calories: 1800,
    protein: 150,
    carbs: 100,
    fat: 70,
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    suitableFor: ["burn-fat"],
    meals: [
      {
        id: "m1",
        name: "Protein-Packed Breakfast Bowl",
        calories: 450,
        protein: 35,
        carbs: 30,
        fat: 20,
        time: "8:00 AM",
        imageUrl: "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg"
      },
      {
        id: "m2",
        name: "Grilled Chicken Salad",
        calories: 550,
        protein: 45,
        carbs: 25,
        fat: 25,
        time: "12:30 PM",
        imageUrl: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg"
      },
      {
        id: "m3",
        name: "Protein Smoothie",
        calories: 250,
        protein: 30,
        carbs: 15,
        fat: 5,
        time: "4:00 PM",
        imageUrl: "https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg"
      },
      {
        id: "m4",
        name: "Baked Salmon with Vegetables",
        calories: 550,
        protein: 40,
        carbs: 30,
        fat: 20,
        time: "7:00 PM",
        imageUrl: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg"
      }
    ]
  },
  {
    id: "mp2",
    title: "Balanced Wellness Plan",
    description: "Well-balanced macronutrients for overall health maintenance.",
    calories: 2200,
    protein: 120,
    carbs: 250,
    fat: 70,
    imageUrl: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg",
    suitableFor: ["stay-healthy"],
    meals: [
      {
        id: "m5",
        name: "Oatmeal with Fruits",
        calories: 450,
        protein: 15,
        carbs: 75,
        fat: 10,
        time: "8:00 AM",
        imageUrl: "https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg"
      },
      {
        id: "m6",
        name: "Quinoa Bowl with Avocado",
        calories: 600,
        protein: 25,
        carbs: 80,
        fat: 20,
        time: "12:30 PM",
        imageUrl: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg"
      },
      {
        id: "m7",
        name: "Greek Yogurt with Honey",
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        time: "4:00 PM",
        imageUrl: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg"
      },
      {
        id: "m8",
        name: "Turkey Stir-Fry",
        calories: 850,
        protein: 60,
        carbs: 65,
        fat: 30,
        time: "7:00 PM",
        imageUrl: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg"
      }
    ]
  },
  {
    id: "mp3",
    title: "Lean & Light",
    description: "Low calorie, nutrient-dense meals for weight management.",
    calories: 1600,
    protein: 120,
    carbs: 130,
    fat: 55,
    imageUrl: "https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg",
    suitableFor: ["slim"],
    meals: [
      {
        id: "m9",
        name: "Egg White Veggie Omelette",
        calories: 300,
        protein: 25,
        carbs: 15,
        fat: 15,
        time: "8:00 AM",
        imageUrl: "https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg"
      },
      {
        id: "m10",
        name: "Lentil Soup",
        calories: 400,
        protein: 30,
        carbs: 45,
        fat: 10,
        time: "12:30 PM",
        imageUrl: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg"
      },
      {
        id: "m11",
        name: "Rice Cakes with Hummus",
        calories: 250,
        protein: 10,
        carbs: 30,
        fat: 10,
        time: "4:00 PM",
        imageUrl: "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg"
      },
      {
        id: "m12",
        name: "Steamed Fish with Greens",
        calories: 650,
        protein: 55,
        carbs: 40,
        fat: 20,
        time: "7:00 PM",
        imageUrl: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg"
      }
    ]
  }
];

export const dieticians: Dietician[] = [
  {
    id: "d1",
    name: "Dr. Emily Chen",
    specialization: "Sports Nutrition",
    experience: 8,
    imageUrl: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
    expertise: ["Weight Management", "Athletic Performance", "Vegetarian Diets"],
    contactInfo: {
      email: "emily.chen@calcraftr.com",
      phone: "123-456-7890"
    }
  },
  {
    id: "d2",
    name: "James Wilson",
    specialization: "Clinical Nutrition",
    experience: 12,
    imageUrl: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg",
    expertise: ["Diabetes Management", "Heart Health", "Food Allergies"],
    contactInfo: {
      email: "james.wilson@calcraftr.com",
      phone: "234-567-8901"
    }
  },
  {
    id: "d3",
    name: "Sarah Johnson",
    specialization: "Plant-Based Nutrition",
    experience: 6,
    imageUrl: "https://images.pexels.com/photos/5214954/pexels-photo-5214954.jpeg",
    expertise: ["Vegan Diets", "Sustainable Eating", "Gut Health"],
    contactInfo: {
      email: "sarah.johnson@calcraftr.com",
      phone: "345-678-9012"
    }
  },
  {
    id: "d4",
    name: "Michael Rodriguez",
    specialization: "Pediatric Nutrition",
    experience: 10,
    imageUrl: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg",
    expertise: ["Children's Nutrition", "Picky Eaters", "Allergies and Intolerances"],
    contactInfo: {
      email: "michael.rodriguez@calcraftr.com",
      phone: "456-789-0123"
    }
  }
];