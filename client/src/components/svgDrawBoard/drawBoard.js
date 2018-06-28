import React, { Component } from 'react';
import './drawBoard.css';

function getCursorPosition(svgBoard, event) {
    var rectB = svgBoard.getBoundingClientRect();
    var cx = event.clientX - rectB.left;
    var cy = event.clientY - rectB.top;
    return  [cx, cy];
}



var ws;
class DrawBoard extends Component {
    constructor(props)
    {
        ws = new WebSocket('ws://localhost:40510');
        ws.onopen = function () {
        console.log('websocket is connected ...');
        ws.send('connected');
        }

        ws.onmessage = function (ev) {
        console.log('message recieved');
        }
        super(props);
        this.state = {
            strokes : [],
            drawing : false,
            strokeWidth : 0.5,
            path : "",
            points: [],
            lastPoint : [0, 0],
            socket: ws
        };

        this.finishDraw = this.finishDraw.bind(this);
        this.draw = this.draw.bind(this);
        this.startDraw = this.startDraw.bind(this);

    }



    startDraw(e){
        const pStrokes = this.state.strokes;
        const cStrokeWidth = this.state.strokeWidth;
        let cPath = this.state.path;
        const svgBoard = document.getElementById('mainBoard');
        let coords = getCursorPosition(svgBoard, e);
        let nPath = cPath + "M"+ coords[0] + "," + coords[1] + " ";
        
        this.setState({
            strokes:pStrokes,
            drawing: true,
            strokeWidth: cStrokeWidth,
            path: nPath,
            lastPoint: coords
         });
        ws.send(nPath);
    }


    draw(e){
        const isDrawing = this.state.drawing;
        if(isDrawing)
        {
            const pStrokes = this.state.strokes;
            const cStrokeWidth = this.state.strokeWidth;
            let cPath = this.state.path;
            const svgBoard = document.getElementById('mainBoard');
            let coords = getCursorPosition(svgBoard, e);
            let nPath = cPath + "L"+ coords[0] + "," + coords[1] + " ";


            this.setState({
                strokes:pStrokes,
                drawing: true,
                strokeWidth: cStrokeWidth,
                path: nPath,
                lastPoint: coords

             });

        }


    }

    finishDraw(e){
        const isDrawing = this.state.drawing;
        if(isDrawing)
        {
            const pStrokes = this.state.strokes;
            const cStrokeWidth = this.state.strokeWidth;
            let path = this.state.path;
            console.log(path);
            this.setState({strokes:pStrokes, drawing: false, strokeWidth: cStrokeWidth});
        }

    }

    render(){


         return(
          <svg className='board' id='mainBoard' zoomAndPan='magnify' onMouseDown={this.startDraw} onMouseMove={this.draw} onMouseUp={this.finishDraw} onMouseLeave={this.finishDraw}>
          <path d={this.state.path} className='path' zoomAndPan='magnify' />
          </svg>

        );
    }
}

export default DrawBoard;
