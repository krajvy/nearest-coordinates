import React from 'react';
import Input from './Input';

function InputSubmit(props) {
    return (
        <div>
            <Input
                name="submit"
                type="submit"
                value={props.value}
            />
        </div>
    );
}

export default InputSubmit;
