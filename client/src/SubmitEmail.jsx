import { useState } from "react";
const ROOTURL = 'http://localhost:8080'
export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you could send the email to your backend or API
    console.log("Email submitted:", email);

    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email:email})
    }
    fetch(ROOTURL+'/addemail', options)
    .then(response => {
       if (!response.ok){
         throw new Error('Request Could Not Be Processed!')
       }
       return response.json()
    })
    .then(data => {
      console.log(data)
      setSubmitted(true)
    })
    .catch(error => {
      alert(error.message)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition-all">
        {!submitted ? (
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Join Our Newsletter</h2>
              <p className="text-gray-500 mt-1">Stay up to date with our latest news</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600">Thank you! 🎉</h2>
            <p className="text-gray-600">You’ve been subscribed with <strong>{email}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}
