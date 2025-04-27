import React, { useState } from 'react';
import TaskCard from './taskcard';
import TaskModal from './taskmodel'; 

function TaskBoard() {

  const initialTasks = {
    todo: [],
    inProgress: [],
    done: [],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

 
  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };


  const addTask = (newTask) => {
    const newId = Math.max(...Object.values(tasks).flat().map(t => t.id), 0) + 1;
    const task = { id: newId, ...newTask };
    setTasks(prev => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], task], 
    }));
  };

  
  const updateTask = (updatedTask) => {
 
    const updatedTasks = { ...tasks };
    for (const status in updatedTasks) {
      updatedTasks[status] = updatedTasks[status].filter(t => t.id !== updatedTask.id);
    }
   
    updatedTasks[updatedTask.status] = [...updatedTasks[updatedTask.status], updatedTask];
    setTasks(updatedTasks);
  };


  const deleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    for (const status in updatedTasks) {
      updatedTasks[status] = updatedTasks[status].filter(t => t.id !== taskId);
    }
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Task Board</h2>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['todo', 'inProgress', 'done'].map(status => (
          <div key={status} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              {status.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            {tasks[status].length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              tasks[status].map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setEditingTask={setEditingTask}
                  setShowModal={setShowModal}
                  deleteTask={deleteTask}
                />
              ))
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <TaskModal
          editingTask={editingTask}
          setShowModal={setShowModal}
          addTask={addTask}
          updateTask={updateTask}
        />
      )}
    </div>
  );
}

export default TaskBoard;
