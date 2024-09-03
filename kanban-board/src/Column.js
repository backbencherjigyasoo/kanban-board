// src/components/Column.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const Column = ({ title, tasks, onDropTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      onDropTask(item.id, title);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: '16px',
        backgroundColor: '#f4f5f7',
        borderRadius: '4px',
        marginRight: '16px',
        minHeight: '300px',
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
