import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function UserProfile(){
   const { user } = useAuth0()

   return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl text-center">
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 mx-auto rounded-full mb-6 border-4 border-blue-500"
        />
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-lg text-gray-700 mb-1">{user.email}</p>
        <p className="text-sm text-gray-500 mt-4">User ID: {user.sub}</p>
      </div>
    </div>
    <div>
    <Link to='/tasks' className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 flex justify-center">Task Manager!</Link>
   </div>
   </>
  );
}



export default UserProfile