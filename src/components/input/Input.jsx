import React from 'react';

function Input(props) {
    return (
        <input
            className={`input input--${props.name}`}
            name={props.name}
            type={props.type}
            value={props.value}
        />
    );
}

export default Input;