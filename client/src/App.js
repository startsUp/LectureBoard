import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/navbar';
import DrawBoard from './components/svgDrawBoard/drawBoard';
import QuestionBoard from './components/questionBoard/qBoard';

var ws;

/* // TODO: CHECKOUT NORMALIZE.CSS // */
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            qBoardShow : false,
            roomCode: 'Not Coneected',
            newQ: 0,
        }

        ws = new WebSocket('ws://localhost:40510');
        ws.onopen = () => {
            console.log('websocket is connected ...');
        }

        ws.onmessage = (message) => {
            this.setState({questions: [...this.state.questions, {question: message.data, score: 0}], newQ: this.state.newQ+1});
        }
        this.show = this.show.bind(this);

    }

    show(){
        this.setState({qBoardShow: !this.state.qBoardShow});
    }




    auto_grow(element) {
        console.log('auto_grow');
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

    }


    componentDidUpdate(){
        // var id = 'question' + (this.state.questions.length-1);
        // console.log(id);
        // var element = document.getElementById(id);
        // if (element !== null)
        //     this.auto_grow(element);
        //
        // element.parentNode.scrollTop = element.offsetTop;
    }


    render() {

      return (
          <div className='container'>
            <div><NavBar newQ={1} roomCode={this.state.roomCode} onToggle={this.show}/></div>
            <QuestionBoard newQ={this.props.newQ} show={this.state.qBoardShow} newQuestion={this.broadcastQuestion} webSocket={ws}/>
            <div id='canvasArea'><DrawBoard/></div>
          </div>
      );
    }
}

export default App;
