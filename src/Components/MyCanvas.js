import React, { useState, useEffect, useRef } from 'react';
import MyInput from "./MyInput";

function MyCanvas(props) {
    const myContainer = useRef({});
    const [size, setSize] = useState(100)
    let {biggerCircle: R, lessCircle: r, distance: d} = props


    function getNextCanvasState() {
        let [x, y, step] = [0, 0, 0]
        let prevBiggerRadius, prevLessRadius, prevDistance, scalingFactor, stepFactor
        return function () {
            const memoizedScalingFactor = (whatToGet) => {
                if (prevBiggerRadius !== R || prevLessRadius !== r || prevDistance !== d) {
                    [prevBiggerRadius, prevLessRadius, prevDistance] = [R, r, d] //if changed save new values
                    { // calculate scalingFactor
                        let maxRadius = Math.abs(prevBiggerRadius - prevLessRadius) + +prevDistance;
                        scalingFactor = (myContainer.current.myCanvas.offsetWidth / 2.1) / maxRadius
                    }
                    { // calculate stepFactor
                        let difference = Math.abs(prevBiggerRadius - prevLessRadius) + +prevDistance;
                        let biggerOne = (prevBiggerRadius > prevLessRadius) ?
                            prevBiggerRadius : prevLessRadius
                        stepFactor = (biggerOne/2.2) / difference
                    }
                }
                return whatToGet === "scaling" ? scalingFactor : stepFactor
            }
            return [
                x = ((R-r) * Math.cos(step) + d * Math.cos((R-r)*step/r)) * memoizedScalingFactor("scaling"),
                y = ((R-r) * Math.sin(step) - d * Math.sin((R-r)*step/r)) * memoizedScalingFactor("scaling"),
                step+=0.01 * memoizedScalingFactor("step"),
            ]
        }
    }



    function drawCanvas(size){
        let [x, y] = myContainer.current.nextValues()
        myContainer.current.ctx.fillRect(x + (size/2), y + (size/2), 2, 2)
        myContainer.current.drawTimer = setTimeout(drawCanvas, 1, size)
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
            ({biggerCircle: R, lessCircle: r, distance: d} = props)
            myContainer.current.nextValues = getNextCanvasState()
        }
    }, [props])



    return (
        <div className="container-fluid p-0">
            <canvas
                className="container-fluid p-0"
                width={size}
                height={size}
            >

            </canvas>
        </div>
    );
}

export default MyCanvas;