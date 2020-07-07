import React from 'react';

function SavedOptions(props) {

    return (
        <button
            type="button"
            className="list-group-item list-group-item-action"
            id={props.id}
            onClick={props.handleClick}
            onContextMenu={props.handleContextClick}
        >
            <span> First radius: {props.r1}</span>
            <span> Second radius: {props.r2}</span>
            <span> Distance: {props.d}</span>
        </button>
    )
}

export default SavedOptions;
