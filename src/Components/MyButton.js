import React from 'react';

function MyButton(props) {
    let shown = props.disabled ? "d-none" : ""

    return (
        <button
            className={"btn btn-light more-dark m-2 " + shown}
            onClick={props.handleClick}
        >
            {props.text}
        </button>
    );
}

export default MyButton;