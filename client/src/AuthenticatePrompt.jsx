import { useAuth0 } from "@auth0/auth0-react";

const LoginPrompt = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        {!isAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to FlowMate</h1>
            <p className="text-gray-600 mb-6">Log in to manage your tasks and boost productivity.</p>

            <button
              onClick={() => loginWithRedirect()}
              className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg rounded-lg transition-all duration-300"
            >
              Login with Auth0
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {user.name} 👋</h1>
            <p className="text-gray-600 mb-6">You're already logged in.</p>

            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold text-lg rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPrompt;
