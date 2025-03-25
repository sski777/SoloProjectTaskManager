import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  // the Auth0 logout method safely redericts you to another page
  // it removes The users JWT stored in the client-side in either localstorage or http-only cookies
  return (
    <button 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;