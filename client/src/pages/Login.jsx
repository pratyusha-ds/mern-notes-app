import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/user/userSlice";
import { Home } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Both email and password are required.");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.rejected.match(resultAction)) {
        const errorMessage =
          resultAction.payload?.message ||
          resultAction.error?.message ||
          "Login failed.";
        setErrorMsg(errorMessage);
      } else {
        navigate("/notes");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bg-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h1>

          {errorMsg && (
            <div className="mb-4 bg-red-500 text-white p-2 rounded text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <div
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-gray-800 cursor-pointer flex items-center gap-2 hover:underline"
          >
            <Home size={16} />
            Go to Homepage
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
