import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;