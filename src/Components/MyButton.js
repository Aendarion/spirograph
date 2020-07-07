import React from 'react';

function MyButton(props) {
    let shown = props.disabled ? "d-none" : ""
    let additionalClasses = props.myClasses ? props.myClasses : ""
        let buttonClasses = "btn btn-light more-dark m-2 "+shown+" "+additionalClasses

    return (
        <button
            className={buttonClasses}
            onClick={props.handleClick}
        >
            {props.text}
        </button>
    );
}

export default MyButton;