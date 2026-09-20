import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Homepage from "./pages/Homepage";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "./redux/api/usersApiSlice";
import { logout } from "./redux/features/authSlice";

function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  // Don't show navigation on homepage when not logged in
  if (!userInfo && window.location.pathname === '/') {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
        E-Waste Recycler
      </Link>
      <div className="flex gap-4 items-center">
        {userInfo ? (
          <>
            <span className="text-gray-300 flex items-center">
              <span className="hidden sm:inline">Welcome,</span> {userInfo.username}
            </span>
            <button 
              onClick={logoutHandler} 
              className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  const renderDashboard = () => {
    if (!userInfo) {
      return <Homepage />;
    }

    const DashboardContent = () => {
      switch (userInfo.role) {
        case "ADMIN":
          return <AdminDashboard />;
        case "AGENT":
        case "COLLECTOR":
          return <AgentDashboard />;
        case "CITIZEN":
          return <CitizenDashboard />;
        default:
          return <CitizenDashboard />;
      }
    };

    return (
      <main className="max-w-7xl mx-auto p-4 mt-8">
        <DashboardContent />
      </main>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <Routes>
          <Route path="/" element={renderDashboard()} />
          <Route path="/login" element={
            <div className="max-w-7xl mx-auto p-4 mt-8">
              <Login />
            </div>
          } />
          <Route path="/register" element={
            <div className="max-w-7xl mx-auto p-4 mt-8">
              <Register />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
