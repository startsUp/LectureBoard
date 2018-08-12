import React, { Component } from 'react';
import './navbar.css';
import image from '../../res/o.png';
import paintBrushIcon from '../../res/paintBrush2.svg';
import pencilIcon from '../../res/pencil.svg';
import inkIcon from '../../res/ink.svg';
import QuestionBoard from '../questionBoard/qBoard';



class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            icons : [{id:'selectedIcon', stroke: '#000000'},
                     {id: '', stroke: '#d2e1e1'},
                     {id: '', stroke: '#d2e1e1'}]
        }


    }

    updateSelection(i){
        var updatedIcons = [];
        for(var j=0; j<3; j++)
        {
            if(i===j)
                updatedIcons.push({id:'selectedIcon', stroke: '#000000'});
            else
                updatedIcons.push({id:'', stroke: '#d2e1e1'});
        }
        this.setState({icons:updatedIcons});
    }

    openMessageBoard(){
        this.updateSelection(3);
    }


    getIcon(props, i) {

        if(i===0){
            return(<span key={i}><svg xmlns="http://www.w3.org/2000/svg" width="200mm" height="250mm" viewBox="0 0 200 250" onClick={() => this.updateSelection(i)} className='icon' shape-rendering='geometricPrecision' id={props.id}>
                <g fill="none" stroke={props.stroke}><path d="M67.307 88.291l-.987 375.097c.329 14.05 73.702 13.316 72.057 0V88.685c-25.758 3.442-49.258 2.983-71.07-.394zM65.333 455.516h73.044M66.94 87.45l34.522-44.439 37.25 44.897M94.452 52.08c4.606 1.36 9.213 1.748 13.82 0" stroke-width="3.298"/><path d="M78.43 89.768v365.705M92.971 90.653V455.22M114.194 90.751v364.666M128.26 89.964v365.552" stroke-width=".873"/><path d="M99.44 51.435c-1.372-.17-1.977-.3-1.979-.429-.002-.131 4.027-5.344 4.085-5.284.716.753 4.311 5.272 4.242 5.333-.416.365-4.491.609-6.348.38z" stroke-width=".5050832199999999"/><path d="M98.628 51.046c-.356-.064-.67-.139-.698-.166-.08-.08 3.552-4.717 3.656-4.667.052.025.92 1.076 1.927 2.336 1.576 1.972 1.8 2.31 1.603 2.42-.294.167-5.638.23-6.488.077z" stroke-width=".5050832199999999"/><path d="M99.634 50.81c-.685-.023-1.226-.097-1.203-.162.039-.108 2.044-2.714 2.824-3.67l.32-.392 1.63 2.043c.898 1.124 1.614 2.059 1.591 2.078-.083.068-3.956.146-5.162.104z" stroke-width=".5050832199999999"/><path d="M98.942 50.451c0-.049 2.248-2.99 2.542-3.325.076-.087 1.065 1.088 2.707 3.217.102.132-.43.167-2.56.167-1.48 0-2.69-.026-2.69-.059z" stroke-width=".5050832199999999"/><path d="M99.569 50.076c.069-.092.539-.704 1.043-1.36l.919-1.191.476.538c.262.296.766.907 1.12 1.359l.643.82h-2.163c-1.709 0-2.137-.034-2.038-.166z" stroke-width=".5050832199999999"/><path d="M100.759 48.973c.415-.55.769-1.002.787-1.002.018 0 .406.451.862 1.002l.829 1.003h-3.233z" stroke-width=".5050832199999999"/><path d="M101.04 49.04l.499-.67.5.57c.275.312.502.613.505.668.003.055-.446.1-.999.1h-1.005z" stroke-width=".5050832199999999"/><path d="M101.28 49.174c.304-.336.422-.336.602 0 .13.245.101.267-.35.267-.485 0-.49-.005-.252-.267z" stroke-width=".5050832199999999"/></g>
                </svg></span>
            );
        }

        else if(i===1){
            return(<span key={i}><svg xmlns="http://www.w3.org/2000/svg" width="200mm" height="250mm" viewBox="0 0 200 250" onClick={() => this.updateSelection(i)} className='icon' shape-rendering='geometricPrecision' id={props.id}>
            <g transform="translate(0 -47)" fill="none" stroke={props.stroke}><path d="M65.421 209.567l68.778-.282-8.162-46.62-52.643.479z" stroke-width="5.787"/><ellipse ry="1.44" rx="34.881" cy="157.381" cx="99.842" stroke-width="5.614"/><path d="M83.646 156.199l-12.138-30.827 24.945-42.824M116.653 156.216l12.228-30.844-21.956-42.732" stroke-width="5.787"/><path d="M96.857 80.73l-.021 43.768c-6.874 11.901 16.817 11.145 9.41 0l.043-43.533" stroke-width="6.107"/><path d="M64.849 212.195l19.444 140.959M134.656 211.793l-19.289 141.361" stroke-width="5.787"/></g>
            </svg></span>);
        }
        else{
            return(<span key={i}><svg xmlns="http://www.w3.org/2000/svg" width="200mm" height="250mm" viewBox="0 0 200 250" onClick={() => this.updateSelection(i)} className='icon' shape-rendering='geometricPrecision' id={props.id}>
            <g fill="none" stroke={props.stroke} stroke-width="4.677"><path d="M77.012 116.738c-13.838-9.917-13.506-34.945 23.811-78.87 4.857 38.12 21.444 32.047 27.88 54.922 3.68 13.08-6.916 24.453-18.698 28.347-8.823 2.916-24.436 1.962-32.993-4.399"/><path d="M77.012 116.738l-5.732 19.933c23.846 8.592 43.328 2.684 56.79-.224l-7.424-20.992"/><path d="M71.28 136.67s-8.407 45.324.232 91.01c3.095 16.368 19.291 73.784 31.456 73.703 16.136-.108 26.212-61.776 27.403-73.495 4.648-45.757-2.301-91.44-2.301-91.44"/></g>
            </svg></span>);
        }
    }

    getQuestionCard(question){
        return(<div className='questionCard'>{question}</div>);
    }

    render(){

        const icons = this.state.icons.map((props, index) => {
            return(this.getIcon(props, index));
        });
        

    return(

      <div className='nav'>
      <div className='icons'>
          {icons}
      </div>
        <div/>

        <QuestionBoard questions={this.props.questions} newQ={this.props.newQ}/>

      </div>

    );
  }
}

export default NavBar;
