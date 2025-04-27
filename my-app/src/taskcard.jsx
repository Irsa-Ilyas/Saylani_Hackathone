import React from 'react';

function TaskCard({ task, setEditingTask, setShowModal, deleteTask }) {
  const handleEdit = () => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
      <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
