import React, { useState, useEffect } from 'react';
import { mealPlans } from '../../data/mockData';
import { MealPlan, Meal } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Bookmark, BookmarkCheck, Info, X } from 'lucide-react';

type Props = {
  onApplyMealPlan: (meals: Meal[]) => void;
  onApplySingleMeal: (meal: Meal) => void;
};

const MealPlans: React.FC<Props> = ({ onApplyMealPlan, onApplySingleMeal }) => {
  const { user } = useAuth();
  const [filteredPlans, setFilteredPlans] = useState<MealPlan[]>([]);
  const [savedPlans, setSavedPlans] = useState<string[]>([]);
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  useEffect(() => {
    if (user?.goal) {
      const plans = mealPlans.filter(plan => 
        plan.suitableFor.includes(user.goal)
      );
      setFilteredPlans(plans.length > 0 ? plans : mealPlans);
    } else {
      setFilteredPlans(mealPlans);
    }
  }, [user?.goal]);

  const toggleSavePlan = (planId: string) => {
    setSavedPlans(prev =>
      prev.includes(planId) ? prev.filter(id => id !== planId) : [...prev, planId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meal Plans</h1>
        <p className="text-gray-600 mt-2">
          Curated meal plans to help you reach your wellness goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <div 
            key={plan.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative h-48">
              <img 
                src={plan.imageUrl} 
                alt={plan.title} 
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => toggleSavePlan(plan.id)}
                className="absolute top-3 right-3 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100"
              >
                {savedPlans.includes(plan.id) ? (
                  <BookmarkCheck className="text-green-500" size={20} />
                ) : (
                  <Bookmark className="text-gray-600" size={20} />
                )}
              </button>
            </div>

            <div className="p-6">
              <div className="uppercase text-sm text-green-600 font-bold">
                {plan.calories} CALORIES
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-1">{plan.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{plan.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {plan.suitableFor.map(goal => (
                  <span 
                    key={goal}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {goal.replace('-', ' ')}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 text-center text-sm">
                <div>
                  <p className="text-gray-500">Protein</p>
                  <p className="font-semibold">{plan.protein}g</p>
                </div>
                <div>
                  <p className="text-gray-500">Carbs</p>
                  <p className="font-semibold">{plan.carbs}g</p>
                </div>
                <div>
                  <p className="text-gray-500">Fat</p>
                  <p className="font-semibold">{plan.fat}g</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onApplyMealPlan(plan.meals)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                >
                  Apply This Meal Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length > 0 && (
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {filteredPlans[0].title} - Daily Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans[0].meals.map(meal => (
              <div key={meal.id} className="bg-gray-50 rounded-xl shadow-sm p-4 hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-white border">
                    <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-800">{meal.name}</h3>
                    {meal.time && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock size={14} /> {meal.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 text-sm gap-2 text-gray-600">
                  <p><strong>{meal.calories}</strong> cal</p>
                  <p><strong>{meal.protein}g</strong> protein</p>
                  <p><strong>{meal.carbs}g</strong> carbs</p>
                  <p><strong>{meal.fat}g</strong> fat</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => onApplySingleMeal(meal)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded-md transition"
                  >
                    Apply This Meal
                  </button>
                  <button
                    onClick={() => setActiveMeal(meal)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-md transition flex items-center justify-center"
                  >
                    <Info size={16} className="mr-1" /> Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setActiveMeal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">How to make {activeMeal.name}</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {activeMeal.instructions || 'Instructions coming soon.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlans;