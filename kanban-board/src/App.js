// src/App.js
import React from 'react';
import KanbanBoard from './KanbanBoard.js';

function App() {
  return (
    <div style={{ padding: '32px' }}>
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
