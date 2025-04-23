import { Link } from "react-router-dom";
export default function AboutPage() {
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-12 h-full flex flex-col justify-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">About FlowMate</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          FlowMate is your personal task manager combined with the power of the Pomodoro technique. 
          Designed to enhance productivity, it helps you break tasks into focused time intervals, 
          ensuring you stay on track and manage your workload efficiently.
        </p>
        <h2 className="text-3xl font-semibold text-gray-700 mt-8 mb-4 text-center">Why FlowMate?</h2>
        <ul className="list-disc pl-8 text-gray-600 text-lg space-y-2">
          <li>Organize your tasks effortlessly.</li>
          <li>Use the Pomodoro timer to stay focused.</li>
          <li>Track your progress and improve productivity.</li>
        </ul>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">Start managing your tasks smarter with FlowMate!</p>
        </div>
      </div>
    </div>
    <div>
        <Link to='/email' className="inline-block px-6 py-3 bg-blue-500 text-black font-bold text-xl hover:bg-blue-400 transition-all duration-300 flex justify-center">Submit Email!</Link>
    </div>
    </div>
  );
}