import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const RegistrationForm: React.FC = () => {
  const { user, updateUserInfo } = useAuth();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState<'burn-fat' | 'stay-healthy' | 'slim'>('stay-healthy');
  const [allergies, setAllergies] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!height) newErrors.height = 'Height is required';
    else if (isNaN(Number(height)) || Number(height) <= 0) 
      newErrors.height = 'Please enter a valid height';
    
    if (!weight) newErrors.weight = 'Weight is required';
    else if (isNaN(Number(weight)) || Number(weight) <= 0) 
      newErrors.weight = 'Please enter a valid weight';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateUserInfo({
        height: Number(height),
        weight: Number(weight),
        goal,
        allergies: allergies ? allergies.split(',').map(item => item.trim()) : [],
      });
    }
  };

  const goalDescriptions = {
    'burn-fat': 'Focus on reducing body fat while maintaining muscle mass',
    'stay-healthy': 'Maintain current weight with balanced nutrition',
    'slim': 'Gradually reduce weight with a moderate calorie deficit'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            We need some information to personalize your experience
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                min="1"
                required
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  errors.height ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  if (errors.height) {
                    const newErrors = {...errors};
                    delete newErrors.height;
                    setErrors(newErrors);
                  }
                }}
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="1"
                required
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  errors.weight ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                placeholder="Enter your weight in kg"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  if (errors.weight) {
                    const newErrors = {...errors};
                    delete newErrors.weight;
                    setErrors(newErrors);
                  }
                }}
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                Your Goal
              </label>
              <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(['burn-fat', 'stay-healthy', 'slim'] as const).map((goalOption) => (
                  <div
                    key={goalOption}
                    className={`relative rounded-lg border ${
                      goal === goalOption
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300'
                    } p-4 flex cursor-pointer focus:outline-none transition-colors duration-200`}
                    onClick={() => setGoal(goalOption)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 capitalize">
                            {goalOption.replace('-', ' ')}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {goalDescriptions[goalOption]}
                          </p>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        goal === goalOption
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {goal === goalOption && (
                          <span className="h-2.5 w-2.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies (comma separated, optional)
              </label>
              <input
                id="allergies"
                name="allergies"
                type="text"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="e.g. nuts, dairy, gluten"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;