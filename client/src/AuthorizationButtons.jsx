import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button className='bg-blue-500 font-bold p-1 rounded-lg' onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
          <button className='bg-red-500 font-bold p-1 rounded-lg' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
      )}
    </div>
  );
};

export default AuthButton;