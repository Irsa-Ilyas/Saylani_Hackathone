import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login'); 
  };

  const handleLogout = () => {
  
    alert("Logged out!");
    navigate('/'); 
  };

  return (
    <div className="h-screen bg-blue-300 flex justify-center items-center">
      <div className="text-center text-white p-6 rounded-xl shadow-lg bg-opacity-70 bg-white">
        <h1 className="text-4xl font-bold mb-6 text-gray-400">Welcome to Our App!</h1>
        
     
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white-600 px-6 py-2 rounded-full text-lg mb-4"
        >
          Get Started
        </button>

        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
