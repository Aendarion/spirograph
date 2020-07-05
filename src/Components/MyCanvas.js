import React, { useState, useEffect, useRef } from 'react';
import MyInput from "./MyInput";

function MyCanvas(props) {
    const myContainer = useRef({});
    const [size, setSize] = useState(100)
    let {biggerCircle: R, lessCircle: r, angle: d} = props


    function getNextCanvasState() {
        let [x, y, step] = [0, 0, 0]
        return function () {
            return [
                x = (R-r) * Math.cos(step) + d * Math.cos((R-r)*step/r),
                y = (R-r) * Math.sin(step) - d * Math.sin((R-r)*step/r),
                step+=0.01,
            ]
        }
    }



    function drawCanvas(size){
        let [x, y] = myContainer.current.nextValues()
        myContainer.current.ctx.fillRect(x + (size/2), y + (size/2), 2, 2)
        myContainer.current.drawTimer = setTimeout(drawCanvas, 2, size)
    }



    useEffect(() => { //get element after first render
        myContainer.current.myCanvas = document.querySelector('canvas')
        setSize(myContainer.current.myCanvas.offsetWidth)
        myContainer.current.ctx = myContainer.current.myCanvas.getContext('2d')
        myContainer.current.nextValues = getNextCanvasState()
    }, [])

    useEffect(() => {
        if (props.isPaused) {
            clearTimeout(myContainer.current.drawTimer)
        } else if (!props.isStopped) {
            drawCanvas(myContainer.current.myCanvas.offsetWidth)
        }
    }, [props.isPaused, props.isStopped])

    useEffect(() => {
        if (props.isStopped) {

            clearTimeout(myContainer.current.drawTimer)
            myContainer.current.ctx.clearRect(0, 0, size, size);
            ({biggerCircle: R, lessCircle: r, angle: d} = props)
            myContainer.current.nextValues = getNextCanvasState()
        }
    }, [props])



    return (
        <div className="container-fluid">
            <canvas
                className="container-fluid"
                width={size}
                height={size}
            >

            </canvas>
        </div>
    );
}

export default MyCanvas;