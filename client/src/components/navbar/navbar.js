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
            icons : [{id:'selectedIcon', stroke: '#000000'}],
            show: {menu: false, hostPopup: false, questionBoard: false}
        }

        this.toggle = this.toggle.bind(this);


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
    toggle(id){
        if(id==='menu')
            this.setState({show: Object.assign({}, this.state.show, {menu: !this.state.show.menu})});
        if(id==='popup')
            this.setState({show: Object.assign({}, this.state.show, {hostPopup: !this.state.show.hostPopup})});
        if(id==='qBoard')
            this.setState({show: Object.assign({}, this.state.show, {questionBoard: !this.state.show.questionBoard})});
    }

    getIcon(props, i) {

        if(i===0){
            return(
                <div key={i} className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={()=>this.toggle('menu')} className='svgIcon' shape-rendering='geometricPrecision' id={this.state.show.menu ? 'menudown' : 'menu'} >
                        <path d="M24 3c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1V3zM24 11c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1v-2zM24 19c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1v-2z"/>
                    </svg>
                </div>
            );
        }

        else if(i===1){
            return(<span key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20mm" height="25mm" viewBox="0 0 20 25" onClick={() => this.updateSelection(i)} className='icon' shape-rendering='geometricPrecision' id={props.id}>
                        <g transform="translate(0 -272)" fill="none" stroke={props.stroke}>
                            <path d="M6.187 287.891l7.508-.03-.891-4.989-5.747.051z" stroke-width=".496"/>
                            <ellipse ry=".052" rx="3.808" cy="282.517" cx="9.845" stroke-width=".417"/>
                            <path d="M8.242 282.342l-1.391-3.461 2.46-4.567M11.78 282.425l1.417-3.69-2.48-4.428" stroke-width=".496"/>
                            <path d="M9.31 274.314l.026 4.473c-.75 1.702 2.185 1.623 1.344.033l.037-4.512" stroke-width=".368"/>
                            <path d="M6.15 288.05l2.097 15.208M13.733 288.016l-2.144 14.974" stroke-width=".496"/>
                        </g>
                    </svg>
                   </span>);

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
        const host = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.13 80.13" className='svgIcon' id={this.state.show.hostPopup ? 'selected-svg-icon' : ''} onClick={()=>this.toggle('popup')}><g>
            <path d="M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 0 0 4.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 0 1-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 0 1 5.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 0 1-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z"/>
            </g>
        </svg>;
        const qBIcon =
                <div id='qBoardMenu'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='svgIcon' id={this.state.show.questionBoard ? 'qIcon-selected' : 'qIcon'} onClick={()=>this.toggle('qBoard')} >
                        <path d="M346 319c-5.522 0-10 4.477-10 10v69c0 27.57-22.43 50-50 50H178.032c-5.521 0-9.996 4.473-10 9.993l-.014 19.882-23.868-23.867a10.003 10.003 0 0 0-9.171-6.008H70c-27.57 0-50-22.43-50-50V244c0-27.57 22.43-50 50-50h101c5.522 0 10-4.477 10-10s-4.478-10-10-10H70c-38.598 0-70 31.402-70 70v154c0 38.598 31.402 70 70 70h59.858l41.071 41.071a9.997 9.997 0 0 0 10.894 2.169 10 10 0 0 0 6.177-9.233l.024-34.007H286c38.598 0 70-31.402 70-70v-69c0-5.523-4.478-10-10-10z"/>
                        <path d="M366.655 0h-25.309C261.202 0 196 65.202 196 145.346s65.202 145.345 145.345 145.345h25.309c12.509 0 24.89-1.589 36.89-4.729l37.387 37.366A10 10 0 0 0 458 316.255v-57.856c15.829-12.819 28.978-29.012 38.206-47.102C506.687 190.751 512 168.562 512 145.346 512 65.202 446.798 0 366.655 0zm75.328 245.535a10.003 10.003 0 0 0-3.983 7.988v38.6l-24.471-24.458a10.003 10.003 0 0 0-10.006-2.485c-11.903 3.658-24.307 5.512-36.868 5.512h-25.309c-69.117 0-125.346-56.23-125.346-125.346S272.23 20 341.346 20h25.309C435.771 20 492 76.23 492 145.346c0 39.731-18.23 76.249-50.017 100.189z"/>
                        <path d="M399.033 109.421c-1.443-20.935-18.319-37.811-39.255-39.254-11.868-.815-23.194 3.188-31.863 11.281-8.55 7.981-13.453 19.263-13.453 30.954 0 5.523 4.478 10 10 10s10-4.477 10-10c0-6.259 2.522-12.06 7.1-16.333 4.574-4.269 10.552-6.382 16.842-5.948 11.028.76 19.917 9.649 20.677 20.676.768 11.137-6.539 20.979-17.373 23.403-8.778 1.964-14.908 9.592-14.908 18.549v24.025c0 5.523 4.478 10 10 10 5.523 0 10-4.477 9.999-10v-23.226c20.15-4.868 33.669-23.306 32.234-44.127zM363.87 209.26c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21 1.07-7.07 2.93a10.076 10.076 0 0 0-2.93 7.07c0 2.64 1.071 5.22 2.93 7.08 1.86 1.86 4.44 2.92 7.07 2.92s5.21-1.06 7.07-2.92a10.1 10.1 0 0 0 2.93-7.08c0-2.63-1.071-5.21-2.93-7.07zM275 310H64c-5.522 0-10 4.477-10 10s4.478 10 10 10h211c5.523 0 10-4.477 10-10s-4.478-10-10-10zM282.069 368.93C280.21 367.07 277.63 366 275 366s-5.21 1.07-7.07 2.93c-1.861 1.86-2.93 4.44-2.93 7.07s1.07 5.21 2.93 7.07c1.86 1.86 4.44 2.93 7.07 2.93s5.21-1.07 7.069-2.93A10.055 10.055 0 0 0 285 376c0-2.63-1.071-5.21-2.931-7.07zM235.667 366H64c-5.522 0-10 4.477-10 10s4.478 10 10 10h171.667c5.523 0 10-4.477 10-10s-4.478-10-10-10zM210 254H64c-5.522 0-10 4.477-10 10s4.478 10 10 10h146c5.523 0 10-4.477 10-10s-4.478-10-10-10z"/>
                    </svg>
                </div>;

        const cancel = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" id='cIcon'><path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z"/></svg>;
        // const popupDisplay = this.state
        const code = 'AFE34C';
        const popup = <div className='popupWrapper' style={{display:(this.state.show.hostPopup) ? '' : 'none'}} onClick={()=>this.toggle('popup')}>
                        <div className='popup' onClick={this.toggle}>
                            <div id='popupTitle'> Host </div>
                            <div id='borderDiv'/>
                            <div id='closeIcon'>{cancel}</div>
                            <div id='popupDesc'>
                                Room Code:<br/> <h2>{code}</h2><br/><div style={{fontSize: '1rem'}}>People can join your session using this code.</div>
                            </div>
                        </div>
                      </div>;

    return(

      <div className='nav'>
          <div className='menu'>
              {icons}
              <div className='menuItem' id={this.state.show.menu ?  'sMenuItems': 'hMenuItems'}>
                {host}
                {popup}
              </div>

          </div>
          {qBIcon}
        <QuestionBoard questions={this.props.questions} newQ={this.props.newQ} show={this.state.show.questionBoard}/>

      </div>

    );
  }
}

export default NavBar;
