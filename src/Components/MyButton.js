import React from 'react';

function MyButton(props) {
    let shown = props.disabled ? " d-none" : ""
    let additionalClasses = props.myClasses ? props.myClasses : ""
        let buttonClasses = "btn btn-light more-dark m-0"+shown+" "+additionalClasses

    return (
        <button
            className={buttonClasses}
            onClick={props.handleClick}
            id={props.id}
        >
            {props.text}
        </button>
    );
}

export default MyButton;