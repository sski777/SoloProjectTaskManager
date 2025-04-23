import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import AuthButton from './AuthorizationButtons';
const Navbar = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0()
  return (
    <nav className="bg-gray-800 p-6 h-20 flex items-center justify-start">
      {/* Logo / Brand */}
      <div className="text-white text-3xl font-bold">
        <Link to="/">FlowMate</Link>
      </div>
      <div className="flex justify-start space-x-8 ml-6">
        <Link to="/">
          <img 
            src="/logo.webp" 
            alt="Logo"
            className="w-11 h-11 rounded-full"
          />
      </Link>
      </div>
      {/* Navigation Links */}
      <ul className="flex space-x-6 text-white text-lg ml-auto">
          <>
            <li className='font-bold'>
              <Link to="/tasks">Task Manager</Link>
            </li>
            <li className='font-bold'>
              <Link to="/timer">Pomodoro Timer</Link>
            </li>
            <li className='font-bold'>
              <Link to="/category">Category</Link>
            </li>
            <li className='font-bold'>
              <Link to='/favorites'>Favorites</Link>
            </li>
            <li className='font-bold'>
              <Link to='/hidden'>Hidden</Link>
            </li>
            <li className='font-bold'>
              <Link to="/about">About</Link>
            </li>
            <li>
           {!isAuthenticated ? (
        <button className='font-bold rounded-lg' onClick={() => loginWithRedirect()}>Log In</button>
            ) : (
          <button className='font-bold rounded-lg' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
            )}
            </li>
            {isAuthenticated && <li><Link to='/profile' className="p-2 rounded-lg bg-blue-500 font-bold">Profile</Link></li>}
          </>
      </ul>
     </nav>
  );
};

export default Navbar;