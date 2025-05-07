import React from 'react';
import { Home, Utensils, PieChart, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) return null;

  const navItems = [
    { name: 'Home', icon: <Home size={20} />, page: 'dashboard' },
    { name: 'Meal Plans', icon: <Utensils size={20} />, page: 'mealPlans' },
    { name: 'Track Meals', icon: <PieChart size={20} />, page: 'trackMeals' },
    { name: 'Contact Dietician', icon: <Users size={20} />, page: 'contactDietician' },
  ];

  return (
    <nav className="bg-white shadow-md transition-all duration-300 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span 
              className="text-green-500 font-bold text-xl cursor-pointer flex items-center"
              onClick={() => setCurrentPage('dashboard')}
            >
              <PieChart className="mr-2 text-green-500" size={24} />
              CalCraftr
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'text-green-500 bg-green-50'
                    : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            ))}
            
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="relative">
              <button
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  menu?.classList.toggle('hidden');
                }}
                className="p-2 rounded-md text-gray-600 hover:text-green-500 hover:bg-green-50 focus:outline-none"
              >
                <svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === item.page
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
          ))}
          
          <button
            onClick={() => {
              logout();
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;