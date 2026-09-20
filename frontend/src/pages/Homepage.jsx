import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">E-Waste</span>
              <br />
              Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">Rewards</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join the sustainable revolution. Schedule pickups, recycle responsibly, and earn reward points for every kilogram.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg border-2 border-teal-500 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">50M+</div>
              <div className="text-gray-400 text-sm">Tons E-Waste Yearly</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">17%</div>
              <div className="text-gray-400 text-sm">Properly Recycled</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">8</div>
              <div className="text-gray-400 text-sm">Item Categories</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">60</div>
              <div className="text-gray-400 text-sm">Max Points/Kg</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">How It Works</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Simple, fast, and rewarding. Start recycling in three easy steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Schedule Pickup</h3>
                <p className="text-gray-400">
                  Register and create a pickup request. Select your e-waste category, quantity, and preferred date.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">We Collect</h3>
                <p className="text-gray-400">
                  Our collection agents will pick up your e-waste from your doorstep. Track status in real-time.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Earn Rewards</h3>
                <p className="text-gray-400">
                  Get reward points based on weight and category. View your balance and transaction history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">What We Recycle</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We accept 8 different categories of electronic waste with varying reward points.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Laptops & PCs", points: "50 pts/kg", icon: "💻", color: "from-blue-500 to-cyan-500" },
              { name: "Mobiles & Tablets", points: "60 pts/kg", icon: "📱", color: "from-purple-500 to-pink-500" },
              { name: "TVs & Monitors", points: "30 pts/kg", icon: "🖥️", color: "from-green-500 to-teal-500" },
              { name: "Batteries", points: "40 pts/kg", icon: "🔋", color: "from-yellow-500 to-orange-500" },
              { name: "Cables & Chargers", points: "20 pts/kg", icon: "🔌", color: "from-red-500 to-pink-500" },
              { name: "Printers", points: "35 pts/kg", icon: "🖨️", color: "from-indigo-500 to-blue-500" },
              { name: "Home Appliances", points: "25 pts/kg", icon: "🏠", color: "from-teal-500 to-green-500" },
              { name: "Accessories", points: "15 pts/kg", icon: "🎧", color: "from-pink-500 to-rose-500" },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className={`text-5xl mb-4 bg-gradient-to-r ${category.color} bg-clip-text`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-teal-400 font-bold">{category.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Platform Features</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Everything you need for seamless e-waste management
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Tracking",
                desc: "Monitor your pickup request from submission to completion",
                icon: "📍",
              },
              {
                title: "Reward Wallet",
                desc: "Track your points, balance, and complete transaction history",
                icon: "💰",
              },
              {
                title: "Multiple Roles",
                desc: "Citizen, Collection Agent, and Admin dashboards",
                icon: "👥",
              },
              {
                title: "Smart Analytics",
                desc: "Category-wise breakdown and detailed metrics",
                icon: "📊",
              },
              {
                title: "Secure Platform",
                desc: "JWT authentication with role-based access control",
                icon: "🔒",
              },
              {
                title: "Easy Scheduling",
                desc: "Pick your date, time, and location preferences",
                icon: "📅",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl p-12 border border-teal-500/20">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are recycling responsibly and earning rewards.
            </p>
            <Link
              to="/register"
              className="inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Start Recycling Today
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2026 E-Waste Recycler. All rights reserved.</p>
          <p className="mt-2 text-sm">Building a sustainable future, one device at a time. 🌱♻️</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
