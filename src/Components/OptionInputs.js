import MyInput from "./MyInput";
import React from "react";


function OptionInputs(props) {
    let showOnError = props.isStopped ? function () {} : props.errorAnimation

    return (
        <div
            className="list-group"
            onClick={showOnError}
        >
            <MyInput
                text="First circle radius"
                value={props.less}
                handleChange={props.handleLess}
                disabled={!(props.isPaused && props.isStopped)}
                isStopped={props.isStopped}
                errorAnimation={showOnError}
            />
            <MyInput
                text="Second circle radius"
                value={props.bigger}
                handleChange={props.handleBigger}
                disabled={!(props.isPaused && props.isStopped)}
                isStopped={props.isStopped}
                errorAnimation={showOnError}
            />
            <MyInput
                text="Distance"
                value={props.distance}
                handleChange={props.handleDistance}
                disabled={!(props.isPaused && props.isStopped)}
                isStopped={props.isStopped}
                errorAnimation={showOnError}
            />
        </div>

    )
}

export default OptionInputs;
