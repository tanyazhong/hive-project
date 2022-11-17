import React from 'react';
import './App.css';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  const items1 = ["Hamburger", "Hot Dog", "Sandwich"];
  const items2 = ["Ketchup", "Mustard", "Mayo", "Sriracha", "Relish", "Secret Sauce"];

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <Dropdown items={items1} isSingleSelect={true}></Dropdown>
      <Dropdown items={items2} isSingleSelect={false}></Dropdown>
    </div>
  );
}

export default App;
