import React from 'react';

function Button(props) {
    return (
        <button
            className={`btn btn--${props.name}`}
            name={props.name}
            type="button"
        >
            {props.value}
        </button>
    );
}

export default Button;
