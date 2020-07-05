import React, {useState} from 'react';
import MyCanvas from "./MyCanvas";
import MyButton from "./MyButton";
import MyInput from "./MyInput";

function Spirograph() {
    const [lessCircleRadius, setLessCircleRadius] = useState(109)
    const [biggerCircleRadius, setBiggerCircleRadius] = useState(200)
    const [angle, setAngle] = useState(109)
    const [isStopped, setIsStopped] = useState(true)
    const [isPaused, setIsPaused] = useState(true)

    function handleChangeLessCircle(event) {
        setLessCircleRadius(event.target.value)
    }

    function handleChangeBiggerCircle(event) {
        setBiggerCircleRadius(event.target.value)
    }

    function handleChangeAngle(event) {
        setAngle(event.target.value)
    }

    function handleClickStopButton() {
        setIsPaused(false)
        if (!isStopped) {
            setIsPaused(true)
        }
        setIsStopped(!isStopped)
    }

    function handleClickPauseButton() {
        setIsPaused(!isPaused)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <MyCanvas
                        lessCircle={lessCircleRadius}
                        biggerCircle={biggerCircleRadius}
                        angle={angle}
                        isStopped={isStopped}
                        isPaused={isPaused}
                    />
                </div>
                <div className="col-sm">
                    <MyInput
                        max={180}
                        text="Less circle radius"
                        value={lessCircleRadius}
                        handleChange={handleChangeLessCircle}
                        disabled={!(isPaused && isStopped)}
                    />
                    <MyInput
                        max={200}
                        text="Bigger circle radius"
                        value={biggerCircleRadius}
                        handleChange={handleChangeBiggerCircle}
                        disabled={!(isPaused && isStopped)}
                    />
                    <MyInput
                        max={180}
                        text="Angle"
                        value={angle}
                        handleChange={handleChangeAngle}
                        disabled={!(isPaused && isStopped)}
                    />
                    <MyButton
                        text={isStopped ? 'start' : 'stop'}
                        handleClick={handleClickStopButton}
                        disabled={false}
                    >
                    </MyButton>
                    <MyButton
                        text={isPaused ? 'resume' : 'pause'}
                        handleClick={handleClickPauseButton}
                        disabled={isStopped} //dont active if drawing stopped
                    >
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

export default Spirograph;
