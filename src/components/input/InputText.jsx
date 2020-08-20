import React from 'react';
import Input from './Input';

function InputText(props) {

    let input =
        <Input
            name={props.name}
            type="text"
        />;

    return (
        <div>
            {props.label ? <label>{props.label}:{input}</label> : {input}}
        </div>
    );
}

export default InputText;
