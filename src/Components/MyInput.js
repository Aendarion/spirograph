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
                min={0}
                max={props.max}
                type="range"
                class={"form-control-range"}
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
