import React from 'react';

function MyInput(props) {
    let myClasses = props.isStopped ? "" : "non-active "
    myClasses +="list-group-item"
    return (
        <div
            className={myClasses}
            onClick={props.errorAnimation}
        >
            <span
                className="open-sans"
            >
                {props.text}: {props.value}
            </span>
            <input
                min={1}
                max={200}
                type="range"
                className="form-control-range"
                step="1"
                value={props.value}
                onChange={props.handleChange}
                disabled={props.disabled}
            >
            </input>
        </div>
    )
}

export default MyInput;
