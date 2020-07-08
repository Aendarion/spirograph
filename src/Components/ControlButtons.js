import React from 'react';
import MyButton from "./MyButton";

function ControlButtons(props) {

    return (
        <div className="mt-2 mb-2">
            <MyButton
                id="stopButton"
                text={props.isStopped ? 'Start' : 'Stop'}
                myClasses={'col'}
                handleClick={props.handleStop}
            >
            </MyButton>
            <MyButton
                text={props.isPaused ? 'Resume' : 'Pause'}
                myClasses={'col'}
                handleClick={props.handlePause}
                disabled={props.isStopped} //dont active if drawing stopped
            >
            </MyButton>
            <MyButton
                text={'Save'}
                myClasses={'col'}
                handleClick={props.handleSave}
            >
            </MyButton>
        </div>
    )
}

export default ControlButtons;
