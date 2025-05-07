import React, { useState } from 'react';
import { Plus, Search, Utensils, PieChart, Check, Flame } from 'lucide-react';
import { Meal, LoggedMeal, ActivityTip } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';
import { mealPlans, activityTips } from '../../data/mockData';
import { useTracking } from '../../contexts/TrackingContext';

const TrackMeals: React.FC = () => {
  const { user } = useAuth();
  const { loggedMeals, addMeal } = useTracking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loggedActivities, setLoggedActivities] = useState<ActivityTip[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const allMeals = mealPlans.flatMap(plan => plan.meals);

  const filteredMeals = searchTerm 
    ? allMeals.filter(meal => 
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleLogMeal = () => {
    if (selectedMeal && user) {
      const loggedMeal: LoggedMeal = {
        ...selectedMeal,
        date: new Date().toISOString(),
        userId: user.username,
      };

      addMeal(loggedMeal);
      setSelectedMeal(null);
      setSearchTerm('');
      setSuccessMessage('Meal logged successfully!');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleAddActivity = (activity: ActivityTip) => {
    setLoggedActivities(prev => [...prev, activity]);
    setSuccessMessage('Activity added successfully!');
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const getTotalNutrition = () => {
    const mealTotals = loggedMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    const burnedCalories = loggedActivities.reduce((acc, activity) => 
      acc + activity.caloriesBurned, 0);

    return {
      ...mealTotals,
      burnedCalories,
      netCalories: mealTotals.calories - burnedCalories
    };
  };

  const renderMacroProgress = (current: number, target: number, label: string, color: string) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);

    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{current}g / {target}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 transition-all duration-300 ease-in-out ${color}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      {/* Remaining UI code (unchanged) */}
    </div>
  );
};

export default TrackMeals;