import React from 'react';
import MyInput from "./MyInput";

function MyCanvasOptions(props) {
    return (
        <MyInput
                min={0}
                max={200}
                text={props.text}
                value={props.value}
                disabled={props.disabled}
                handleChange={props.handleChange}
        />
    );
}

export default MyCanvasOptions;
