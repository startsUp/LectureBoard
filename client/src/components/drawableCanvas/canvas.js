import React, { Component } from 'react';
import './canvas.css';

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var cx = event.clientX - rect.left;
    var cy = event.clientY - rect.top;
    return {x:cx, y:cy};
}
class DrawableCanvas extends Component {
    constructor(props)
    {
        super(props);
        this.state = {drawing: false};
        this.finishDraw = this.finishDraw.bind(this);
        this.draw = this.draw.bind(this);
        this.startDraw = this.startDraw.bind(this);
    }



    startDraw(e){
        this.setState({drawing: true});
        var canvas = document.getElementById('dCanvas');
        var ctx = canvas.getContext('2d');

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'red';
        var coords = getCursorPosition(canvas, e);


        ctx.moveTo(coords.x, coords.y);
        ctx.beginPath();
    }


    draw(e){
        const isDrawing = this.state.drawing;

        if(isDrawing)
        {
            var canvas = document.getElementById('dCanvas');
            console.log(canvas);
            var ctx = canvas.getContext('2d');
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'red';

            var coords = getCursorPosition(canvas, e);

            ctx.lineTo(coords.x, coords.y);
            //console.log(e.clientX + " " + e.clientY);
            ctx.stroke();

        }


    }

    finishDraw(e){
        this.setState({drawing: false});
    }

     render(){
         return(
          <canvas className='canvas' id='dCanvas' onMouseDown={this.startDraw} onMouseMove={this.draw} onMouseUp={this.finishDraw} onMouseLeave={this.finishDraw} />
        );
      }
    }

export default DrawableCanvas;
