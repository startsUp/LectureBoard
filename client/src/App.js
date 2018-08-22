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
            questions : [{question:'Can this show up on the board?Can this show up on the board? Can this show up on the board?Can this show up on the board?', score:99},
                         {question:'Can this show up on the board?' , score:0}, {question:'Can this show up on the board?' , score:0}, {question:'Can this show up on the board?' , score:0}],
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
        this.broadcastQuestion = this.broadcastQuestion.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    show(){
        this.setState({qBoardShow: !this.state.qBoardShow});
    }

    updateScore(vote, index)
    {
        const questions = this.state.questions.slice();
        const score = questions[index].score;
        const updatedQuestion = {...questions[index], score: (vote) ? score+1: score-1};
        questions[index] = updatedQuestion;
        this.setState(
            questions: questions
        );
    }


    auto_grow(element) {
        console.log('auto_grow');
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";

    }

    broadcastQuestion(question){
        this.setState({questions: [...this.state.questions, {question: question, score: 0}], newQ: this.state.newQ+1});
        if(ws.readyState === WebSocket.OPEN)
            ws.send(question);
    }

    componentDidUpdate(){
        var id = 'question' + (this.state.questions.length-1);
        console.log(id);
        var element = document.getElementById(id);
        if (element !== null)
            this.auto_grow(element);

        element.parentNode.scrollTop = element.offsetTop;
    }


    render() {

      return (
          <div className='container'>
            <div><NavBar newQ={1} roomCode={this.state.roomCode} onToggle={this.show}/></div>
            <QuestionBoard questions={this.state.questions} newQ={this.props.newQ} show={this.state.qBoardShow} newQuestion={this.broadcastQuestion} updateScore={this.updateScore}/>
            <div id='canvasArea'><DrawBoard/></div>
          </div>
      );
    }
}

export default App;
