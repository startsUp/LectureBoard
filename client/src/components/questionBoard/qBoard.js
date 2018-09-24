import React, { Component} from 'react';

import './qBoard.css';

class QuestionCard extends Component{
    constructor(props){
        super(props);
        this.state = {votedUp: false, votedDown: false};
        this.auto_grow = this.auto_grow.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.score !== nextProps.score;
    }

    voted(vote)
    {

            if(vote && !this.state.votedUp)
            {
                if(!this.state.votedDown)
                {
                    this.setState({votedUp: true, votedDown: false});
                    this.props.onVote(vote, this.props.index, 1);
                }
                else
                {
                    this.setState({votedUp: true, votedDown: false});
                    this.props.onVote(vote, this.props.index, 2);
                }
            }
            else if (vote && this.state.votedUp)
            {
                this.setState({votedUp: false, votedDown: false});
                this.props.onVote(!vote, this.props.index, 1);
            }
            else if (!vote && this.state.votedDown)
            {
                this.setState({votedUp: false, votedDown: false});
                this.props.onVote(!vote, this.props.index, 1);
            }
            else if(!vote && !this.state.votedDown)
            {
                if(!this.state.votedUp)
                {
                    this.setState({votedUp: false, votedDown: true});
                    this.props.onVote(vote, this.props.index, 1);
                }
                else
                {
                    this.setState({votedUp: false, votedDown: true});
                    this.props.onVote(vote, this.props.index, 2);
                }
            }



    }


    getVoteIcon(vote){
        const up = this.state.votedUp ? 'votedUp' : 'upvote';
        const down = this.state.votedDown ? 'votedDown' : 'downvote';

        return(<svg xmlns="http://www.w3.org/2000/svg" className='vote' id={vote ? up : down} width="180mm" height="180mm" onClick={() => this.voted(vote)}  viewBox="0 0 180 180">
                 <path d="M89.288 51.602L22.112 120.65l136.661-.177z"  strokeWidth="5.455"/>
               </svg>);
    }
    componentDidUpdate(){




    }

    auto_grow()
    {
        var element = document.getElementById(this.props.id);
        if (element !== null)
        {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }

    }


    render(){

        const upvote = this.getVoteIcon(true);
        const downvote = this.getVoteIcon(false);
        const qCardID = 'qCard' + this.props.index;
        const question = this.props.question;
        console.log(qCardID);
        return(<li className='questionCard' id={qCardID} onClick={this.auto_grow}>
                <div className='votingCard'>
                    <div>{upvote}</div>
                    <div id='voteCount'>{this.props.score}</div>
                    <div>{downvote}</div>
                </div>
                <div className='question'>
                    <h3 id='questionTitle'>{this.props.title}</h3>
                    <div  dangerouslySetInnerHTML={{__html: question}}></div>
                </div>
               </li>);
    }

}
class QuestionBoard extends Component {

    constructor(props){
        super(props);
        this.state = {
            hidden : true,
            hover: false,
            submitStatus: false,
            questions : [{title: 'Handwriting', question:'Professor can you write better, im having trouble understanding your handwriting', score:99},
                         {title: 'Shutup', question:'Can you please shut up?' , score:0}, {title: 'Despacito', question:'So today in Spanish class, my teacher told us that we would be listening to a song in Spanish. Already, I began to tremble. I had a bad feeling about this. Which one? I ask shakily, not wanting to hear the answer. Despacito She responds. I begin to hyperventilate. My worst fears have been realized. I fade in and out of conciseness. I clamp my palms over my ears, but I know it’s futile. The song plays. I’m crying now, praying. God, Allah, Buddha please help me. I curl up on the floor. There’s nothing I can do now. And then it happens. The chorus plays. The girls in my class open their mouths. The screams of the damned, the shrieks of the tortured fill my ears and bounce around my skull. My eardrums rupture, blood leaking out. I try to scream, but no sound comes out. I can only sit there, violently shaking as it happens to me. After what seems like hours, it’s finally over. I try to move, but I cannot make myself. My brain shuts down as my vision fades to black. I muster the last of my energy, uttering the accursed word. Despacito' , score:0},
                         {title: 'Overused', question:'What <br>?' , score:0}],
        }
        this.show = this.show.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.toggleQuestions = this.toggleQuestions.bind(this);

    }
    addQuestion(title, question)
    {

        this.setState({questions: [...this.state.questions, {title: title, question: question, score: 0}], newQ: this.state.newQ+1});
        if(this.props.webSocket.readyState === WebSocket.OPEN)
            this.props.webSocket.send(question);
    }

    show()
    {
        this.setState({hidden: !this.state.hidden});
    }

    updateScore(vote, index, num)
    {
        console.log(num);
        const questions = this.state.questions.slice();
        const score = questions[index].score;
        const updatedScore = (vote) ? score+num: score-num;
        const updatedQuestion = {...questions[index], score: updatedScore};

        questions[index] = updatedQuestion;
        this.setState({questions: questions});
    }

    changeColor()
    {
        console.log('hover');
        this.setState({hover: !this.state.hover});
    }

    handleFiles(files)
    {

    }

    getQuestionCard(question, score, index)
    {


    }

    handleSubmit()
    {
        var title = document.getElementById('title-textbox').value;
        var question = document.getElementById('qt-textbox').value;
        console.log(title);
        console.log(question);


        this.setState({submitStatus: !this.state.submitStatus});
    }

    toggleQuestions()
    {
        if(this.state.submitStatus)
        {
            var title = document.getElementById('title-textbox').value.replace(/(?:\r\n|\r|\n)/g, '<br>');
            var question = document.getElementById('qt-textbox').value.replace(/(?:\r\n|\r|\n)/g, '<br>');
            this.addQuestion(title, question)

            //call broadcastQuestion here
        }

        this.setState({submitStatus: !this.state.submitStatus});
    }



    scrollInputIntoView(){
        // const element = document.getElementById('textbox');
        // element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }
    render(){

        const qB = this.state.questions.map((questionObject, index) => {
            const id = 'question' + index;
            return(<QuestionCard key={index} title={questionObject.title} question={questionObject.question} index={index} id={id} score={questionObject.score} onVote={this.updateScore}/>);
        });
        const back = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492" className='svgIcon' id='back-svg'>
                        <path d="M464.344 207.418l.768.168H135.888l103.496-103.724c5.068-5.064 7.848-11.924 7.848-19.124 0-7.2-2.78-14.012-7.848-19.088L223.28 49.538c-5.064-5.064-11.812-7.864-19.008-7.864-7.2 0-13.952 2.78-19.016 7.844L7.844 226.914C2.76 231.998-.02 238.77 0 245.974c-.02 7.244 2.76 14.02 7.844 19.096l177.412 177.412c5.064 5.06 11.812 7.844 19.016 7.844 7.196 0 13.944-2.788 19.008-7.844l16.104-16.112c5.068-5.056 7.848-11.808 7.848-19.008 0-7.196-2.78-13.592-7.848-18.652L134.72 284.406h329.992c14.828 0 27.288-12.78 27.288-27.6v-22.788c0-14.82-12.828-26.6-27.656-26.6z"/>
                     </svg>;


        const attach = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.623 52.623" className='attachIcon' id='attach'>
                            <path d="M34.679 48.679c-2.322 2.07-5.389 3.205-8.64 3.198-3.25-.006-6.308-1.152-8.612-3.23-2.304-2.076-3.566-4.825-3.554-7.738l.132-32.018c.021-4.581 4.12-8.029 9.539-8.019 5.419.01 9.49 3.471 9.472 8.053l-.124 30.079c-.012 2.823-2.583 5.12-5.738 5.114-3.152-.006-5.707-2.31-5.696-5.135l.084-20.375c.002-.688.626-1.243 1.393-1.242.766.002 1.386.56 1.382 1.247l-.083 20.375c-.006 1.453 1.307 2.639 2.93 2.642 1.623.002 2.945-1.18 2.952-2.631l.125-30.08c.012-3.161-2.872-5.552-6.708-5.559-3.837-.007-6.74 2.373-6.752 5.536l-.132 32.018c-.01 2.249.967 4.372 2.747 5.978 1.782 1.606 4.145 2.493 6.654 2.497 2.508.005 4.879-.874 6.674-2.473 1.794-1.6 2.787-3.72 2.797-5.968l.132-32.018c.002-.687.625-1.243 1.393-1.241.766 0 1.384.559 1.382 1.246l-.132 32.018c-.012 2.913-1.295 5.657-3.617 7.726z"/>
                        </svg>
        const screenclip = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='attachIcon' id='screenclip'>
                            <path d="M374.226.499h-70.819v39.922h70.819c11.58 0 21.002 9.402 21.002 20.959v70.862h39.922V61.38c0-33.57-27.331-60.881-60.924-60.881zM395.268 172.164h39.922v91.821h-39.922zM60.881.543C27.311.543 0 27.874 0 61.467v70.819h39.922V61.467c0-11.581 9.402-21.002 20.959-21.002h70.862V.543H60.881zM171.665.499h91.821v39.922h-91.821zM171.665 395.727h91.821v39.922h-91.821zM60.968 395.727c-11.581 0-21.003-9.402-21.003-20.959v-70.862H.043v70.862c0 33.57 27.331 60.881 60.924 60.881h70.819v-39.922H60.968zM0 172.164h39.922v91.821H0zM435.15 395.727v-91.821h-39.922v91.821h-91.821v39.922h91.821v75.852h39.922v-75.852H512v-39.922z"/>
                           </svg>;

        const icon = <svg xmlns="http://www.w3.org/2000/svg" className='dropDown' id={this.props.show ? 'iconA':'icon'} onClick={this.show} width="180mm" height="180mm" viewBox="0 0 180 180">
                        <path d="M89.288 51.602L22.112 120.65l136.661-.177z" fill="#f9fffe" stroke="ivory" stroke-width="5.455"/>
                     </svg>;
        const input = <div className='inputcard'>
                        <div>
                            <form className='input' onSubmit={this.handleSubmit}>
                                <textarea type='text' id='title-textbox' placeholder='Title...'></textarea>
                                <textarea type='text' id='qt-textbox' placeholder='Type your question here...'></textarea>
                            </form>
                            <div id='attachments'>
                            <input type="file" id="fileInput" multiple accept="image/*" style={{display: 'none'}} onChange={() => this.handleFiles(this.files)}/>
                                <label for="fileInput" id='attachButton'>
                                <div>{attach}</div>
                                <div>Attach</div>
                                </label>
                                <div id='border'/>
                                <div id='clipButton'>{screenclip}ScreenClip</div>
                            </div>;
                        </div>

                        <div id='submit'>{send}</div>

                      </div>;

                      // <div id='attachments'>
                      //     <div id='clipIcon'><input type="file" id="fileInput" multiple accept="image/*" style={{display: 'none'}} onChange={() => this.handleFiles(this.files)}/> <label for="fileInput">{attach}</label></div>
                      //     <div id='border'/>
                      //     <div id='sClip'>{screenclip}</div>
                      // </div>
        const sidebarContent = this.state.submitStatus ?

                                <div style={{background:'rgba(13, 17, 18, 0.94)'}}>
                                    <div id='backIcon' onClick={this.toggleQuestions}>{back}</div>
                                    <div>{input}</div>
                                </div>:
                                <div id='qArea'>{qB}</div>;



        const send = <svg xmlns="http://www.w3.org/2000/svg" width="52.493" height="55.239" viewBox="0 0 13.889 14.615"   className='svgIcon' id='sendIcon' onClick={this.handleSubmit}>
                        <path d="M12.685 13.832s-3.822-3.046-5.79-4.75c-1.964 1.704-5.714 4.742-5.714 4.742L6.855.744c-.048-.115 3.701 8.616 5.83 13.088z" />
                     </svg>;




        const addQuestion = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 13.229 13.229" className='svgIcon' id='pop-title'>
                                <path d="M6.615 0v13.23m6.615-6.615H0" stroke-width="1.5"/>
                            </svg>;

        const inputPop = <div id='inputPop'>
                            <button id='popup-title' onClick={this.toggleQuestions}>{this.state.submitStatus ? 'Submit' : 'Submit a question'}</button>
                         </div>


        const questionArea = <div className='qcontainer' id={this.props.show ? 'visible' : 'hidden' }>
                               {sidebarContent}
                               {inputPop}
                             </div>;
    return(

      <div className='qBoard' style={{display:(this.props.show) ? '' : 'none'}}>
        {questionArea}
      </div>

    );
  }
}

export default QuestionBoard;
