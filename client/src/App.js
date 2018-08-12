import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/navbar';
import DrawBoard from './components/svgDrawBoard/drawBoard';
import QuestionBoard from './components/questionBoard/qBoard';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
      const questions = ['Can this show up on the board?Can this show up on the board? Can this show up on the board?Can this show up on the board?',
      'Can this show up on the board?', 'Can this show up on the board?', 'Can this show up on the board?', 'Can this show up on the board?',
      'Can this show up on the board?', 'Can this show up on the board?', 'Can this show up on the board?', 'Can this show up on the board?',
      'Can this show up on the board?'];
      return (
          <div className='container'>
            <div><NavBar questions={questions} newQ={1}/></div>
            <div id='canvasArea'><DrawBoard/></div>
          </div>
      );
    }
}

export default App;
