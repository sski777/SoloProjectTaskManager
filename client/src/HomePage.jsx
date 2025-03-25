import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function HomePage(){
  return(
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center py-12 px-6">
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
        Stay Focused, Stay Productive with Pomodoro Task Manager
      </h1>
      <p className="text-lg sm:text-xl mb-6">
        Boost your productivity and manage your tasks like never before with our intuitive Pomodoro Timer integrated into your task manager. Whether you're tackling work, study, or personal goals, our app helps you break your tasks into manageable intervals—each with a short break to keep your mind sharp. Prioritize, plan, and track your progress effortlessly, all while making the most out of every minute.
      </p>
      <Link
        to='/tasks'
        className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-all duration-300"
      >
        Get Started Today
      </Link>
    </div>
  </div>
  )
}



export default HomePage