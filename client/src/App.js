import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/navbar';
import DrawBoard from './components/svgDrawBoard/drawBoard';

class App extends Component {
  render() {
    return (
      <div className='container'>
      <div><NavBar/></div>
      <div id='canvasArea'><DrawBoard/></div>
      </div>
    );
  }
}

export default App;
