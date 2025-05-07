import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import RegistrationForm from './components/auth/RegistrationForm';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import MealPlans from './components/mealPlans/MealPlans';
import TrackMeals from './components/trackMeals/TrackMeals';
import ContactDietician from './components/dietician/ContactDietician';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showRegistration, setShowRegistration] = useState(false);
  
  useEffect(() => {
    // If user is authenticated but has no height/weight, show registration form
    if (isAuthenticated && user && (user.height === 0 || user.weight === 0)) {
      setShowRegistration(true);
    } else {
      setShowRegistration(false);
    }
  }, [isAuthenticated, user]);
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  if (showRegistration) {
    return <RegistrationForm />;
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'mealPlans':
        return <MealPlans />;
      case 'trackMeals':
        return <TrackMeals />;
      case 'contactDietician':
        return <ContactDietician />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow mt-16 pb-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;