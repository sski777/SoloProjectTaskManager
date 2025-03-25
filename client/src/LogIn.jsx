import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // the logginWithRederict Auth0 Method safely redericts you to the Auth0 powered Login page
  return (
    <button 
      onClick={() => loginWithRedirect()} 
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Log In
    </button>
  );
};

export default LoginButton;