import React, { useState, useEffect } from 'react';
import { Flame, Github, Twitter, Facebook, Instagram, Linkedin, Sun, Moon } from 'lucide-react';
import Login from './components/Login';
import Signup from './components/Signup';
import EventsPage from './components/EventsPage';
import logo from "./assets/logo.png";
import skull from "./assets/image.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load user and theme from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light';

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Default to dark mode
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  if (isLoggedIn) {
    return <EventsPage user={user} handleLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-b dark:from-[#1a0f0f] dark:to-[#2d1515] dark:text-white relative transition-colors duration-500">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-10 w-30" alt="logo" />
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Events</a>

            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="hover:text-orange-500 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!isLoggedIn ? (
              <div className="flex gap-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="hover:text-orange-500 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div>
                <h2>{user?.name || 'User'}</h2>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="container mx-auto px-8 flex justify-between items-center">
            <div className="max-w-2xl">
              <span className="bg-orange-500/20 text-orange-500 px-4 py-1 rounded-full">Welcome</span>
              <h1 className="text-6xl font-bold mt-6 mb-4">The Fusion Club</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Where innovation, creativity, and technology come together to build the future!
              </p>
            </div>
            <div className="relative w-96 h-96">
              <img
                src={skull}
                alt="Futuristic Design"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-20 bg-gray-100 dark:bg-black/20 transition-colors">
          <div className="container mx-auto px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Explore Events</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Gaming Event */}
              <div className="bg-white dark:bg-gradient-to-br dark:from-[#2a1515] dark:to-[#1a0f0f] p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-2">Gaming</h3>
                <div className="bg-gray-100 dark:bg-black/30 rounded-lg p-6 mt-4">
                  <h4 className="text-xl font-semibold mb-2">Game Design Challenge</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">November 29, 2023</p>
                  <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm">Gaming</span>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing.
                  </p>
                </div>
              </div>

              {/* Tech Event */}
              <div className="bg-white dark:bg-gradient-to-br dark:from-[#2a1515] dark:to-[#1a0f0f] p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-2">Tech</h3>
                <div className="bg-gray-100 dark:bg-black/30 rounded-lg p-6 mt-4">
                  <h4 className="text-xl font-semibold mb-2">AI Workshop</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">November 22, 2023</p>
                  <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm">Tech</span>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">About Us</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The Fusion Club is a dynamic community where innovation, creativity, and technology 
              collide to shape the future. We bring together passionate minds from diverse fields to 
              collaborate, learn, and build groundbreaking projects.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mt-6 leading-relaxed">
              Whether you're a coder, designer, or an innovator, Fusion Club is the place to connect, 
              grow, and push boundaries!
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-black/30 border-t border-black/10 dark:border-white/10 py-12">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold uppercase tracking-wider">Fusion</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"><Github /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"><Twitter /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"><Facebook /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"><Instagram /></a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"><Linkedin /></a>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 Fusion Club. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
          switchToSignup={switchToSignup}
        />
      )}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
          switchToLogin={switchToLogin}
        />
      )}
    </div>
  );
}

export default App;
