import React, { useState, useEffect } from 'react';
import { mealPlans } from '../../data/mockData';
import { MealPlan } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';

const MealPlans: React.FC = () => {
  const { user } = useAuth();
  const [filteredPlans, setFilteredPlans] = useState<MealPlan[]>([]);
  const [savedPlans, setSavedPlans] = useState<string[]>([]);
  
  useEffect(() => {
    if (user?.goal) {
      const plans = mealPlans.filter(plan => 
        plan.suitableFor.includes(user.goal)
      );
      setFilteredPlans(plans);
    } else {
      setFilteredPlans(mealPlans);
    }
  }, [user?.goal]);
  
  const toggleSavePlan = (planId: string) => {
    setSavedPlans(prev => {
      if (prev.includes(planId)) {
        return prev.filter(id => id !== planId);
      } else {
        return [...prev, planId];
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meal Plans</h1>
        <p className="text-gray-600 mt-2">
          Curated meal plans to help you reach your wellness goals.
        </p>
      </div>
      
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map(plan => (
          <div 
            key={plan.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-48">
              <img 
                src={plan.imageUrl} 
                alt={plan.title} 
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => toggleSavePlan(plan.id)}
                className="absolute top-3 right-3 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-colors duration-200"
              >
                {savedPlans.includes(plan.id) ? (
                  <BookmarkCheck className="text-green-500" size={20} />
                ) : (
                  <Bookmark className="text-gray-600" size={20} />
                )}
              </button>
            </div>
            
            <div className="p-6">
              <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">
                {plan.calories} calories
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">{plan.title}</h3>
              <p className="mt-2 text-gray-600 line-clamp-2">{plan.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {plan.suitableFor.map(goal => (
                  <span 
                    key={goal}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {goal.replace('-', ' ')}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm">
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
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                  View Plan Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Meal Schedule Example */}
      {filteredPlans.length > 0 && (
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {filteredPlans[0].title} - Daily Schedule
          </h2>
          
          <div className="space-y-6">
            {filteredPlans[0].meals.map(meal => (
              <div key={meal.id} className="flex items-start p-4 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                  {meal.imageUrl && (
                    <img 
                      src={meal.imageUrl} 
                      alt={meal.name} 
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{meal.name}</h3>
                    {meal.time && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        {meal.time}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">{meal.calories}</span>
                      <span className="text-gray-500 ml-1">cal</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{meal.protein}g</span>
                      <span className="text-gray-500 ml-1">protein</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{meal.carbs}g</span>
                      <span className="text-gray-500 ml-1">carbs</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{meal.fat}g</span>
                      <span className="text-gray-500 ml-1">fat</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
              Apply This Meal Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlans;