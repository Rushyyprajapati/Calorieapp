import React, { useState, useEffect } from 'react';
import { Mail, Phone, Star, Filter } from 'lucide-react';
import { dieticians } from '../../data/mockData';
import { Dietician } from '../../utils/types';
import { useAuth } from '../../contexts/AuthContext';

const ContactDietician: React.FC = () => {
  const { user } = useAuth();
  const [filteredDieticians, setFilteredDieticians] = useState<Dietician[]>(dieticians);
  const [filterByAllergies, setFilterByAllergies] = useState(true);
  const [specialization, setSpecialization] = useState<string>('all');
  
  // Get unique specializations for filter
  const specializations = ['all', ...new Set(dieticians.map(d => d.specialization))];
  
  useEffect(() => {
    let filtered = [...dieticians];
    
    // Filter by specialization if not 'all'
    if (specialization !== 'all') {
      filtered = filtered.filter(d => d.specialization === specialization);
    }
    
    // Filter by user allergies if checkbox is checked
    if (filterByAllergies && user?.allergies && user.allergies.length > 0) {
      filtered = filtered.filter(dietician => 
        dietician.expertise.some(exp => 
          user.allergies?.some(allergy => 
            exp.toLowerCase().includes(allergy.toLowerCase())
          )
        )
      );
    }
    
    setFilteredDieticians(filtered);
  }, [specialization, filterByAllergies, user?.allergies]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact a Dietician</h1>
        <p className="text-gray-600 mt-2">
          Get personalized nutrition advice from our expert dieticians.
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Filter className="mr-2 text-blue-500" size={20} />
            Filters
          </h2>
        </div>
        
        <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>
                  {spec === 'all' ? 'All Specializations' : spec}
                </option>
              ))}
            </select>
          </div>
          
          {user?.allergies && user.allergies.length > 0 && (
            <div className="flex items-center">
              <input
                id="filterAllergies"
                type="checkbox"
                checked={filterByAllergies}
                onChange={() => setFilterByAllergies(!filterByAllergies)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="filterAllergies" className="ml-2 block text-sm text-gray-700">
                Show dieticians who specialize in {user.allergies.join(', ')}
              </label>
            </div>
          )}
        </div>
      </div>
      
      {/* Dieticians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDieticians.length > 0 ? (
          filteredDieticians.map(dietician => (
            <div 
              key={dietician.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 w-full">
                <img 
                  src={dietician.imageUrl} 
                  alt={dietician.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{dietician.name}</h3>
                <p className="mt-1 text-sm text-blue-600 font-medium">{dietician.specialization}</p>
                
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < 5 ? "text-yellow-400" : "text-gray-300"} 
                        fill={i < 5 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{dietician.experience} years experience</span>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Expertise:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dietician.expertise.map(exp => (
                      <span 
                        key={exp}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <a 
                    href={`mailto:${dietician.contactInfo.email}`}
                    className="flex items-center w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Mail size={16} className="mr-2" />
                    Email
                  </a>
                  <a 
                    href={`tel:${dietician.contactInfo.phone}`}
                    className="flex items-center w-full justify-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Phone size={16} className="mr-2" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No dieticians found</h3>
            <p className="mt-2 text-gray-500">
              Try changing your filter settings to see more options.
            </p>
            <button
              onClick={() => {
                setSpecialization('all');
                setFilterByAllergies(false);
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDietician;