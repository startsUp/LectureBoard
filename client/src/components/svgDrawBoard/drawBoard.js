import React, { Component } from 'react';
import './drawBoard.css';

var ws;


//// TODO: Fitting Bezier Curve to store less info and smoothen curve
//// Curve Equation : x(u) =  Sum (c (1-u)^3 - ux)
/// Error = Sum(mouse points - actual curve at those points)^2


function getCursorPosition(event) {
    var svgBoard = document.getElementById('mainBoard');
    var rectB = svgBoard.getBoundingClientRect();
    var cx, cy;
    cx = event.pageX - rectB.left;
    cy = event.pageY - rectB.top;

    if(!cx || !cy)
    {
        cx = event.touches[0].pageX - rectB.left;
        cy = event.touches[0].pageY - rectB.top;
    }


    return  [cx, cy];
}

function getPath(path){
    return(
        <path d={path} className='path' zoomAndPan='magnify'/>
    );
}

class Path extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.id === this.props.count)
    }
    render(){

        return(
            <path d={this.props.desc} className='path' zoomAndPan='magnify'/>
        );
    }
}
class DrawBoard extends Component {
    constructor(props)
    {

        super(props);
        this.state = {
            strokes : [],
            strokeCount: 0,
            drawing : false,
            strokeWidth : '0.5',
            path : "",
            lastPoint : [0, 0],
            socket: ws
        };




        this.updateState = this.updateState.bind(this);
        this.finishDraw = this.finishDraw.bind(this);
        this.draw = this.draw.bind(this);
        this.startDraw = this.startDraw.bind(this);
        this.startNewStroke = this.startNewStroke.bind(this);
        this.addToStroke = this.addToStroke.bind(this);
        this.finishStroke= this.finishStroke.bind(this);


        // ws = new WebSocket('ws://localhost:40510');
        // ws.onopen = () => {
        //     console.log('websocket is connected ...');
        // }
        //
        // ws.onmessage = (message) => {
        //     var flag = message.data[0];
        //
        //     if(flag==='M')
        //     {
        //         this.setState({path:message.data});
        //     }
        //     else
        //     {
        //         const cPath = this.state.path;
        //         this.setState({path:cPath+message.data});
        //     }
        //     console.log(flag);
        // }
    }

    startNewStroke(nPath)
    {
        this.setState({path:nPath});
    }
    addToStroke(nPath)
    {

    }
    finishStroke(){}

    updateState(coords, flag){
        let nPath,
            drawingStatus = true;
        let cPath = this.state.path;

        if(flag==='i')
            nPath = "M"+ coords[0] + "," + coords[1] + " ";
        else
            nPath = "L"+ coords[0] + "," + coords[1] + " ";
        var nStrokes = this.state.strokes.slice();
        const updatedPath = cPath + nPath;

        if(!nStrokes)
        {
            nStrokes = [...this.state.strokes, updatedPath];
        }
        else
        {
            nStrokes[this.state.strokeCount] = updatedPath;
        }

        this.setState({
            strokes: nStrokes,
            drawing: drawingStatus,
            path: updatedPath,
            lastPoint: coords,
         });

        // if(ws.readyState === WebSocket.OPEN)
        //     ws.send(nPath);
    }


    startDraw(e)
    {

        let coords = getCursorPosition(e);
        this.updateState(coords, 'i');
    }


    draw(e)
    {

        const isDrawing = this.state.drawing;
        if(isDrawing)
        {
            let coords = getCursorPosition(e);
            this.updateState(coords, 'd');
        }


    }

    finishDraw(e){

        const isDrawing = this.state.drawing;
        if(isDrawing)
        {
            this.setState({
                drawing: false,
                strokeCount : this.state.strokeCount+1,
            });
        }

    }

    render(){
        const cStrokes = this.state.strokeCount;
        const ratio = 70/99;
        const strokes = this.state.strokes.map((stroke, index) => {
            return(
                <Path key={index} strokeWidth={this.state.strokeWidth} desc={stroke} count={this.state.strokeCount} id={index}/>
            );
        });
        //console.log(strokes);

        return(
          <svg className='board' id='mainBoard'  onTouchStart={this.startDraw} onTouchMove={this.draw} onTouchEnd={this.finishDraw} onMouseDown={this.startDraw} onMouseMove={this.draw} onMouseUp={this.finishDraw} onMouseLeave={this.finishDraw}>
         {strokes}
          </svg>

        );
    }
}

export default DrawBoard;
