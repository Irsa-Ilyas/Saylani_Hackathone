import React from "react";
import TaskBoard from "./taskboard";


const Home = () => {
  return (
    <div className="container mx-auto p-4">
  
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to the Task Management App
      </h1>
     
      <TaskBoard/>
    </div>
  );
};

export default Home;
