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

  const isBannedUser = isAuthenticated && user?.username === 'dog';
  const needsProfileCompletion = isAuthenticated && user && (user.height === 0 || user.weight === 0);

  // 🚫 Block banned user "dog"
  if (isBannedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8 bg-red-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700">The user "dog" is not authorized to use this application.</p>
        </div>
      </div>
    );
  }

  // 🔐 Not logged in? Show login
  if (!isAuthenticated) {
    return <Login />;
  }

  // 📝 Logged in but profile incomplete? Show registration
  if (needsProfileCompletion) {
    return <RegistrationForm />;
  }

  // ✅ Main app
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
      <main className="flex-grow mt-16 pb-8">{renderPage()}</main>
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
