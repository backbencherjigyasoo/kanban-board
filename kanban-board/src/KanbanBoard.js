// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';

const KanbanBoard = () => {
  const initialData = JSON.parse(localStorage.getItem('kanbanData')) || {
    tasks: {
      'task-1': { id: 'task-1', content: 'Task 1' },
      'task-2': { id: 'task-2', content: 'Task 2' },
      'task-3': { id: 'task-3', content: 'Task 3' },
    },
    columns: {
      'To Do': ['task-1', 'task-2'],
      'In Progress': ['task-3'],
      'Done': [],
    },
  };

  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);

  useEffect(() => {
    localStorage.setItem('kanbanData', JSON.stringify({ tasks, columns }));
  }, [tasks, columns]);

  const handleDropTask = (taskId, newColumn) => {
    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };
      Object.keys(newColumns).forEach((column) => {
        newColumns[column] = newColumns[column].filter((id) => id !== taskId);
      });
      newColumns[newColumn].push(taskId);
      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {Object.keys(columns).map((column) => (
          <Column
            key={column}
            title={column}
            tasks={columns[column].map((taskId) => tasks[taskId])}
            onDropTask={handleDropTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
