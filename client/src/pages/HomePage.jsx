import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bg-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-3xl mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-white">
              Welcome to Your Notes
            </h1>
            <p className="text-lg text-white mt-2">
              Keep track of your thoughts, ideas, and to-dos. Stay organized and
              productive with our notes app.
            </p>
          </div>

          {user ? (
            <div className="text-center">
              <p className="text-xl text-white mb-4">
                Welcome back, {user.username}!
              </p>
              <Link
                to="/notes"
                className="px-6 py-2 bg-orange-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Go to Notes
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-white mb-6">
                Create an account or log in to start using the app!
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-orange-800 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
