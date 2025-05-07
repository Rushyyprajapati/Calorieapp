import React, { useState } from 'react';
import { Plus, Search, Utensils, PieChart, Check } from 'lucide-react';
import { Meal, LoggedMeal } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';
import { mealPlans } from '../../data/mockData';

const TrackMeals: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Extract all meals from meal plans for search
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
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };
  
  const getTotalNutrition = () => {
    return loggedMeals.reduce((acc, meal) => {
      return {
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };
  
  const renderMacroProgress = (current: number, target: number, label: string, color: string) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    
    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{current}g / {target}g</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${color}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Track Your Meals</h1>
        <p className="text-gray-600 mt-2">
          Keep track of your daily nutrition intake.
        </p>
      </div>
      
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 transform transition-transform duration-300 ease-out">
          <Check className="mr-2" size={20} />
          <span>Meal logged successfully!</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Log meal form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Utensils className="mr-2 text-green-500" size={20} />
              Log Your Meal
            </h2>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Search for a meal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm && (
              <div className="mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredMeals.length > 0 ? (
                  filteredMeals.map(meal => (
                    <button
                      key={meal.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        setSelectedMeal(meal);
                        setSearchTerm(meal.name);
                      }}
                    >
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-500">
                        {meal.calories} cal · {meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No meals found</div>
                )}
              </div>
            )}
            
            {selectedMeal && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{selectedMeal.name}</h3>
                <div className="mt-2 grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <p className="text-gray-500">Calories</p>
                    <p className="font-semibold">{selectedMeal.calories}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Protein</p>
                    <p className="font-semibold">{selectedMeal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Carbs</p>
                    <p className="font-semibold">{selectedMeal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fat</p>
                    <p className="font-semibold">{selectedMeal.fat}g</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogMeal}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  <Plus className="mr-2" size={16} />
                  Log This Meal
                </button>
              </div>
            )}
          </div>
          
          {/* Meal log */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Meals</h2>
            
            {loggedMeals.length > 0 ? (
              <div className="space-y-4">
                {loggedMeals.map((meal, index) => (
                  <div 
                    key={`${meal.id}-${index}`} 
                    className="flex items-start p-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-4">
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
                        <h3 className="font-medium text-gray-900">{meal.name}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(meal.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex flex-wrap gap-4 text-sm">
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
            ) : (
              <div className="text-center py-8">
                <Utensils className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No meals logged</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start by searching for a meal above.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Nutrition summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="mr-2 text-green-500" size={20} />
              Nutrition Summary
            </h2>
            
            <div className="mt-4">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-gray-500 text-sm">Total Calories</p>
                  <p className="text-3xl font-bold text-gray-900">{getTotalNutrition().calories}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Goal</p>
                  <p className="text-xl font-medium text-gray-600">
                    {user?.goal === 'burn-fat' 
                      ? 1800 
                      : user?.goal === 'slim'
                        ? 1600
                        : 2200}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="h-2.5 rounded-full bg-green-600" 
                  style={{ 
                    width: `${Math.min(Math.round((getTotalNutrition().calories / (user?.goal === 'burn-fat' ? 1800 : user?.goal === 'slim' ? 1600 : 2200)) * 100), 100)}%` 
                  }}
                ></div>
              </div>
              
              {renderMacroProgress(
                getTotalNutrition().protein, 
                user?.goal === 'burn-fat' ? 150 : user?.goal === 'slim' ? 120 : 120, 
                'Protein', 
                'bg-blue-500'
              )}
              
              {renderMacroProgress(
                getTotalNutrition().carbs, 
                user?.goal === 'burn-fat' ? 100 : user?.goal === 'slim' ? 130 : 250, 
                'Carbs', 
                'bg-yellow-500'
              )}
              
              {renderMacroProgress(
                getTotalNutrition().fat, 
                user?.goal === 'burn-fat' ? 70 : user?.goal === 'slim' ? 55 : 70, 
                'Fat', 
                'bg-red-500'
              )}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Nutrition Tips</h3>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• Aim for 25-30g of protein per meal</li>
                <li>• Drink at least 8 glasses of water daily</li>
                <li>• Include healthy fats like avocados and nuts</li>
                <li>• Choose complex carbs over simple sugars</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMeals;