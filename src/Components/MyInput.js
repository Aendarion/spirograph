import React from 'react';

function MyInput(props) {

    return (
        <div className="container-fluid m-2 p-0">
            <span
                className={"open-sans"}
            >
                {props.text}: {props.value}
            </span>
            <input
                min={1}
                max={props.max}
                type="range"
                className={"form-control-range"}
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
