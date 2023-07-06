import React from 'react';
import Garden from './components/Garden/Garden';

import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to your garden!</h1>
      </header>
      <Garden />
    </div>
  );
}

export default App;
