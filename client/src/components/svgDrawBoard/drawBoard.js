import React, { Component } from 'react';
import './drawBoard.css';
import fitCurve from 'fit-curve'


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
        event.preventDefault();
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

            <path d={this.props.desc} strokeWidth={this.props.strokeWidth} fill={this.props.fill} stroke={this.props.stroke} className='path' zoomAndPan='magnify'/>
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
            strokeWidth : '3',
            path : 'M',
            points : [],
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
        // let nPath = 'M',
        //     drawingStatus = true;
        // let cPath = this.state.path;
        //
        // var nStrokes = this.state.strokes.slice();
        // var prevPoints = this.state.points.slice();
        //
        // prevPoints = [...this.state.points, coords];
        // console.log(cPath);
        // var bezierCurve = fitCurve(prevPoints, 1);
        // if(bezierCurve)
        // {
        //     for (var i=0; i<bezierCurve.length; i++)
        //     {
        //         if(i==0)
        //             nPath = nPath + bezierCurve[i][0] + " " + bezierCurve[i][1] + " " + bezierCurve[i][2] + " " + bezierCurve[i][3];
        //         else
        //             nPath = nPath + " C" + bezierCurve[i][1] + " " + bezierCurve[i][2] + " " + bezierCurve[i][3];
        //     }
        // }
        //
        // console.log(nPath);
        // nStrokes[this.state.strokeCount] = nPath;
        //
        // this.setState({
        //     strokes: nStrokes,
        //     drawing: drawingStatus,
        //     path: nPath,
        //     points: prevPoints
        //  });
         let nPath,
             drawingStatus = true;
         let cPath = this.state.path;

         if(flag==='i')
             nPath = "M"+ coords[0] + "," + coords[1] + " ";
         else
             nPath = "L"+ coords[0] + "," + coords[1] + " ";
         var nStrokes = this.state.strokes.slice();
         var prevPoints = this.state.points.slice();

         const updatedPath = cPath + nPath;
         console.log(updatedPath)
         if(nStrokes)
            nStrokes[this.state.strokeCount] =  updatedPath;
        else
            nStrokes.append(updatedPath);
         prevPoints = [...this.state.points, coords];


         this.setState({
             strokes: nStrokes,
             drawing: drawingStatus,
             path: updatedPath,
             points: prevPoints
          });

        // if(ws.readyState === WebSocket.OPEN)
        //     ws.send(nPath);
    }

    // updateState(coords, flag){
    //
    //     // if(ws.readyState === WebSocket.OPEN)
    //     //     ws.send(nPath);
    // }


    // startDraw(e)
    // {
    //
    //     let coords = getCursorPosition(e);
    //
    //     // if (e.targetTouches.length>1)
    //     //     return;
    //
    //     /*
    //     initialize all control points to coords
    //     var c0 = coords;
    //     var c1 = coords;
    //     var c2 = coords;
    //     var c3 = coords;
    //
    //     clear the 2d vector distance field
    //     clearDistanceField();
    //
    //
    //     */
    //
    //
    //     this.updateState(coords, 'i');
    // }

    // corner(prevCoords, newCoords)
    // {
    //
    // }
    //
    // draw(e)
    // {
    //
    //
    //
    //
    //     const isDrawing = this.state.drawing;
    //     if(isDrawing)
    //     {
    //         let coords = getCursorPosition(e);
    //
    //         /*
    //         test if the point is corner
    //         var lastPoint = prevCoords;
    //         if(corner(lastPoint, coords))
    //             clear vector field
    //
    //
    //         */
    //         this.updateState(coords, 'd');
    //     }
    //
    //
    // }
    //
    // finishDraw(e){
    //
    //     const isDrawing = this.state.drawing;
    //     if(isDrawing)
    //     {
    //         this.setState({
    //             drawing: false,
    //             strokeCount : this.state.strokeCount+1,
    //         });
    //     }
    //
    // }
    startDraw(e)
    {

        let coords = getCursorPosition(e);

        // if (e.targetTouches.length>1)
        //     return;

        /*
        initialize all control points to coords
        var c0 = coords;
        var c1 = coords;
        var c2 = coords;
        var c3 = coords;

        clear the 2d vector distance field
        clearDistanceField();


        */


        this.updateState(coords, 'i');
    }

    corner(prevCoords, newCoords)
    {

    }

    draw(e)
    {




        const isDrawing = this.state.drawing;
        if(isDrawing)
        {
            let coords = getCursorPosition(e);

            /*
            test if the point is corner
            var lastPoint = prevCoords;
            if(corner(lastPoint, coords))
                clear vector field


            */
            this.updateState(coords, 'd');
        }


    }

    finishDraw(e){
        console.log(this.state.strokes)
        const isDrawing = this.state.drawing;
        if(isDrawing)
        {

            var prevPoints = this.state.points.slice();

            var bezierCurve = fitCurve(prevPoints, 1);
            var nPath = 'M';
            if(bezierCurve)
            {
                for (var i=0; i<bezierCurve.length; i++)
                {
                    if(i==0)
                        nPath = nPath + bezierCurve[i][0] + " " + bezierCurve[i][1] + " " + bezierCurve[i][2] + " " + bezierCurve[i][3];
                    else
                        nPath = nPath + " C" + bezierCurve[i][1] + " " + bezierCurve[i][2] + " " + bezierCurve[i][3];
                }
            }
            var nStrokes = this.state.strokes.slice();
            nStrokes[this.state.strokeCount] =  nPath;
            this.setState({
                drawing: false,
                strokes: nStrokes,
                strokeCount : this.state.strokeCount+1,
                path: '',
                points: []
            });
        }

    }

    render(){
        const cStrokes = this.state.strokeCount;
        const ratio = 70/99;
        const strokes = this.state.strokes.map((stroke, index) => {

            return(
                <Path key={index} strokeWidth={this.state.strokeWidth} stroke="black" fill="none" desc={stroke} count={this.state.strokeCount} id={index}/>
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
