import React, { useState } from 'react';
import { Plus, Search, Utensils, PieChart, Check, Flame } from 'lucide-react';
import { Meal, LoggedMeal, ActivityTip } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';
import { mealPlans, activityTips } from '../../data/mockData';

const TrackMeals: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
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

      setLoggedMeals(prev => [loggedMeal, ...prev]);
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
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Log Meal Section */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
              <Utensils className="mr-2 text-green-600" /> Log Your Meal
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            {filteredMeals.length > 0 && (
              <ul className="mt-4 space-y-2">
                {filteredMeals.map((meal) => (
                  <li key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      <p className="font-semibold text-gray-800">{meal.name}</p>
                      <p className="text-sm text-gray-500">{meal.calories} cal</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMeal(meal);
                        handleLogMeal();
                      }}
                      className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
                    >Add</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Activities Section */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
              <Flame className="mr-2 text-orange-500" /> Today's Activities
            </h2>
            <ul className="space-y-3">
              {activityTips.map((activity) => (
                <li key={activity.title} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.durationMinutes} min · {activity.caloriesBurned} cal</p>
                  </div>
                  <button
                    onClick={() => handleAddActivity(activity)}
                    className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg transition"
                  >Add</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nutrition Summary Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sticky top-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
            <PieChart className="mr-2 text-green-500" /> Nutrition Summary
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-green-600 text-sm font-semibold">Calories Gained</p>
              <p className="text-xl font-bold text-green-700">{getTotalNutrition().calories}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <p className="text-orange-600 text-sm font-semibold">Calories Burned</p>
              <p className="text-xl font-bold text-orange-700">{getTotalNutrition().burnedCalories}</p>
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">Net Calories</p>
            <p className="text-3xl font-extrabold text-gray-800">{getTotalNutrition().netCalories}</p>
            <p className="text-xs text-gray-400">Goal: {user?.goal === 'burn-fat' ? 1800 : user?.goal === 'slim' ? 1600 : 2200}</p>
          </div>

          {renderMacroProgress(getTotalNutrition().protein, user?.goal === 'burn-fat' ? 150 : user?.goal === 'slim' ? 120 : 120, 'Protein', 'bg-blue-500')}
          {renderMacroProgress(getTotalNutrition().carbs, user?.goal === 'burn-fat' ? 100 : user?.goal === 'slim' ? 130 : 250, 'Carbs', 'bg-yellow-500')}
          {renderMacroProgress(getTotalNutrition().fat, user?.goal === 'burn-fat' ? 70 : user?.goal === 'slim' ? 55 : 70, 'Fat', 'bg-red-500')}

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-2 text-gray-700">🍽 Meals</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {loggedMeals.map((meal, i) => (
                <li key={i}>{meal.name} — {meal.calories} cal ({meal.protein}P/{meal.carbs}C/{meal.fat}F)</li>
              ))}
            </ul>

            <h3 className="text-md font-semibold mt-4 mb-2 text-gray-700">🔥 Activities</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {loggedActivities.map((activity, i) => (
                <li key={i}>{activity.title} — {activity.caloriesBurned} cal ({activity.durationMinutes} min)</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-800 mb-2">Nutrition Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Aim for 25–30g of protein per meal</li>
              <li>• Drink at least 8 glasses of water daily</li>
              <li>• Include healthy fats like avocados and nuts</li>
              <li>• Choose complex carbs over simple sugars</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMeals;