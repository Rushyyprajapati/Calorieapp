import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motivationalQuotes, activityTips } from '../../data/mockData';
import { Quote, ActivityTip } from '../../utils/types';
import { TrendingUp, Heart, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [activityTip, setActivityTip] = useState<ActivityTip | null>(null);

  useEffect(() => {
    // Randomly select a quote and activity tip
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
    
    // Filter activity tips based on user goal
    let filteredTips = [...activityTips];
    if (user?.goal === 'burn-fat') {
      filteredTips = activityTips.filter(tip => tip.intensity === 'high' || tip.intensity === 'medium');
    } else if (user?.goal === 'slim') {
      filteredTips = activityTips.filter(tip => tip.intensity !== 'low');
    }
    
    const randomTip = filteredTips[Math.floor(Math.random() * filteredTips.length)];
    setActivityTip(randomTip);
  }, [user?.goal]);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRecommendedCalories = () => {
    if (!user) return 2000;
    
    // Very basic BMR calculation using Harris-Benedict equation
    const bmr = user.goal === 'burn-fat' 
      ? 1800 
      : user.goal === 'slim'
        ? 1600
        : 2200;
    
    return bmr;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {getTimeOfDay()}, {user?.username}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your wellness snapshot for today.
        </p>
      </div>
      
      {/* Motivational Quote */}
      {quote && (
        <div className="bg-gradient-to-r from-blue-500 to-green-400 rounded-xl p-6 text-white shadow-lg mb-8 transform transition-transform duration-300 hover:scale-[1.01]">
          <p className="text-xl font-medium italic">&ldquo;{quote.text}&rdquo;</p>
          <p className="text-white text-opacity-80 mt-2">- {quote.author}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Calorie Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Calorie Target</h2>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Recommended Daily Intake</p>
            <p className="text-3xl font-bold text-gray-800">{getRecommendedCalories()} kcal</p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500">Protein</p>
                <p className="font-semibold">{Math.round(getRecommendedCalories() * 0.3 / 4)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="font-semibold">{Math.round(getRecommendedCalories() * 0.4 / 4)}g</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fat</p>
                <p className="font-semibold">{Math.round(getRecommendedCalories() * 0.3 / 9)}g</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Based on your goal to <span className="font-medium">{user?.goal.replace('-', ' ')}</span>, we've calculated your optimal calorie target.
            </p>
          </div>
        </div>
        
        {/* Health Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Stats</h2>
            <Heart className="text-red-500" size={24} />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1">Height</p>
              <p className="text-xl font-semibold">{user?.height || '--'} cm</p>
            </div>
            
            <div>
              <p className="text-gray-500 mb-1">Weight</p>
              <p className="text-xl font-semibold">{user?.weight || '--'} kg</p>
            </div>
            
            <div>
              <p className="text-gray-500 mb-1">BMI</p>
              <p className="text-xl font-semibold">
                {user?.height && user?.weight 
                  ? (user.weight / Math.pow(user.height/100, 2)).toFixed(1)
                  : '--'}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              These measurements help us personalize your nutrition and activity recommendations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Activity Recommendation */}
      {activityTip && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={activityTip.imageUrl} 
                alt={activityTip.title} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">Activity Recommendation</div>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">{activityTip.title}</h3>
              <p className="mt-2 text-gray-600">{activityTip.description}</p>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="mr-4">
                  <span className="font-medium text-gray-800">{activityTip.durationMinutes}</span> minutes
                </span>
                <span className="mr-4">
                  <span className="font-medium text-gray-800">{activityTip.caloriesBurned}</span> calories
                </span>
                <span>
                  <span className="font-medium text-gray-800 capitalize">{activityTip.intensity}</span> intensity
                </span>
              </div>
              
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                  Add to Today
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;