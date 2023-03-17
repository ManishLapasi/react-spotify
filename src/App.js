import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Switch from './components/Switch';

function App() {
  return (
    <div className="App">
      <div className='topbar'>
        <SearchBar></SearchBar>
        <Switch></Switch>
      </div>
    </div>
  );
}

export default App;
