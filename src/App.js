import React from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
