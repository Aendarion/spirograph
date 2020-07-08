import React from 'react';

function SavedOptions(props) {
    let myClasses = props.isStopped ? "list-group-item-action" : "non-active p-2.5" //gray if canvas drawing
    myClasses += " list-group-item text-center"

    return (
        <button
            type="button"
            className={myClasses}
            id={props.id}
            onClick={props.handleClick}
            onContextMenu={props.handleContextClick}
            data-toggle="tooltip"
            data-placement="top"
            title={props.title}
            delay={{ "show": 1000, "hide": 100 }}
        >
            <span> First radius: {props.r1}</span>
            <span> Second radius: {props.r2}</span>
            <span> Distance: {props.d}</span>
        </button>
    )
}

export default SavedOptions;
