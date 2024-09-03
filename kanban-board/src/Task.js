// src/components/Task.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '8px 0',
        backgroundColor: 'white',
        cursor: 'move',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      }}
    >
      {task.content}
    </div>
  );
};

export default Task;
