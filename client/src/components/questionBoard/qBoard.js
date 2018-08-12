import React, { Component } from 'react';
import './qBoard.css';

class QuestionBoard extends Component {

    constructor(props){
        super(props);
        this.state = {
            hidden : true,
            hover: false,

        }
        this.show = this.show.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }
    show()
    {
        this.setState({hidden: !this.state.hidden});
    }


    changeColor()
    {
        console.log('hover');
        this.setState({hover: !this.state.hover});
    }

    getVoteIcon(up){
        return(<svg xmlns="http://www.w3.org/2000/svg" className='vote' id={up ? 'upvote' : 'downvote'} width="180mm" height="180mm" viewBox="0 0 180 180">
                 <path d="M89.288 51.602L22.112 120.65l136.661-.177z"  stroke-width="5.455"/>
               </svg>);
    }

    getQuestionCard(question)
    {
        const upvote = this.getVoteIcon(true);
        const downvote = this.getVoteIcon(false);
        return(<div className='questionCard'>
                <div className='votingCard' >
                    <div>{upvote}</div>
                    <div id='voteCount'>2</div>
                    <div>{downvote}</div>
                </div>
                <div id='question'>{question}</div>
              </div>);
    }

    render(){

        const qB = this.props.questions.map((question, index) => {
            return(this.getQuestionCard(question));
        });

        const icon = <svg xmlns="http://www.w3.org/2000/svg" className='dropDown' id={this.state.hidden ? 'icon' : 'iconA'} onClick={this.show} width="180mm" height="180mm" viewBox="0 0 180 180">
                        <path d="M89.288 51.602L22.112 120.65l136.661-.177z" fill="#f9fffe" stroke="ivory" stroke-width="5.455"/>
                     </svg>;

        const questions = <div className='qArea'>{qB}</div>;
        const attach = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.623 52.623" className='attachIcon' id='attach'>
                            <path d="M34.679 48.679c-2.322 2.07-5.389 3.205-8.64 3.198-3.25-.006-6.308-1.152-8.612-3.23-2.304-2.076-3.566-4.825-3.554-7.738l.132-32.018c.021-4.581 4.12-8.029 9.539-8.019 5.419.01 9.49 3.471 9.472 8.053l-.124 30.079c-.012 2.823-2.583 5.12-5.738 5.114-3.152-.006-5.707-2.31-5.696-5.135l.084-20.375c.002-.688.626-1.243 1.393-1.242.766.002 1.386.56 1.382 1.247l-.083 20.375c-.006 1.453 1.307 2.639 2.93 2.642 1.623.002 2.945-1.18 2.952-2.631l.125-30.08c.012-3.161-2.872-5.552-6.708-5.559-3.837-.007-6.74 2.373-6.752 5.536l-.132 32.018c-.01 2.249.967 4.372 2.747 5.978 1.782 1.606 4.145 2.493 6.654 2.497 2.508.005 4.879-.874 6.674-2.473 1.794-1.6 2.787-3.72 2.797-5.968l.132-32.018c.002-.687.625-1.243 1.393-1.241.766 0 1.384.559 1.382 1.246l-.132 32.018c-.012 2.913-1.295 5.657-3.617 7.726z"/>
                        </svg>
        const screenclip = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='attachIcon' id='screenclip'>
                            <path d="M374.226.499h-70.819v39.922h70.819c11.58 0 21.002 9.402 21.002 20.959v70.862h39.922V61.38c0-33.57-27.331-60.881-60.924-60.881zM395.268 172.164h39.922v91.821h-39.922zM60.881.543C27.311.543 0 27.874 0 61.467v70.819h39.922V61.467c0-11.581 9.402-21.002 20.959-21.002h70.862V.543H60.881zM171.665.499h91.821v39.922h-91.821zM171.665 395.727h91.821v39.922h-91.821zM60.968 395.727c-11.581 0-21.003-9.402-21.003-20.959v-70.862H.043v70.862c0 33.57 27.331 60.881 60.924 60.881h70.819v-39.922H60.968zM0 172.164h39.922v91.821H0zM435.15 395.727v-91.821h-39.922v91.821h-91.821v39.922h91.821v75.852h39.922v-75.852H512v-39.922z"/>
                           </svg>;
        const input = <div className='inputcard'><div><form className='input'><input type='text' id='textbox'></input></form></div><div id='attachments'><div id='clipIcon'>{attach}</div><div id='sClip'>{screenclip}</div></div></div>;
        const questionArea = <div className='qcontainer' id={this.state.hidden ? 'hidden' : 'visible'}>
                               {questions}
                               {input}
                             </div>;
    return(

      <div className='qBoard'>
        <div id='qBoardTitle' onClick={this.show}><div id='title'>Questions</div> <div id='qCount'>{this.props.newQ}</div><div id='dropDownIcon'>{icon}</div></div>
        {questionArea}

      </div>

    );
  }
}

export default QuestionBoard;
