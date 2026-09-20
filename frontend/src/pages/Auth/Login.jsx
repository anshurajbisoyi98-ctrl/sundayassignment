import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      setErrorMsg(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-teal-400">Sign In</h1>
      {errorMsg && <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">{errorMsg}</div>}
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-400">
        New Customer? <Link to="/register" className="text-teal-400 hover:underline">Register</Link>
      </div>
    </div>
  );
};

export default Login;
