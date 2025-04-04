import React, { useState } from 'react';
import { Flame } from 'lucide-react';

function EventsPage({ user, handleLogout }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');

  const events = [
    {
      id: 1,
      title: 'Welcome to Fusion Club!',
      date: 'November 15, 2023',
      category: 'Tech',
      description: 'Join us for our inaugural event and learn what Fusion Club is all about! Meet fellow members, learn about our upcoming...'
    },
    {
      id: 2,
      title: 'AI Workshop',
      date: 'November 22, 2023',
      category: 'Tech',
      description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!'
    },
    {
      id: 3,
      title: 'Game Design Challenge',
      date: 'November 29, 2023',
      category: 'Gaming',
      description: 'Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing.'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All Categories' || event.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0C0A09] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold uppercase tracking-wider">Fusion</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Events</a>
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 container mx-auto px-8">
        <h1 className="text-4xl font-bold mb-2">All Events</h1>
        <div className="border-b-2 border-orange-500 w-24 mb-8"></div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-[#1C1917] border border-white/10 focus:outline-none focus:border-orange-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#1C1917] border border-white/10 focus:outline-none focus:border-orange-500"
          >
            <option>All Categories</option>
            <option>Tech</option>
            <option>Gaming</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-[#1C1917] to-[#0C0A09] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{event.category}</h3>
                <div className="bg-black/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                  <p className="text-gray-400 mb-4">{event.date}</p>
                  <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                  <p className="mt-4 text-gray-300">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
