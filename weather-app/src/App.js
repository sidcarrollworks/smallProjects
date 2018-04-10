import React, { Component } from 'react';
import './App.css';

import Titles from "./components/titles";
import Weather from "./components/weather";

class App extends Component {


  render() {
    return (
      <div>
        <Titles />
        <Weather />
      </div>
    );
  }
};

export default App;
