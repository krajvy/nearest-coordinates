import React from 'react';
import Input from './Input';
import Button from '../button/Button';

function InputFile(props) {

    let input =
        <Input
            name={props.name}
            type="file"
        />;

    return (
        <>
            <div>
                {props.label ? <label>{props.label}:{input}</label> : {input}}
                <Button
                    name="abort"
                    value="Cancel read"
                />
            </div>
            <div>
                <label>
                    Readed:
                    <span className="file_progressbar_wrapper">
                        <span className="file_progressbar">&nbsp;</span>
                    </span>
                    <span className="file_progressbar_counter">0%</span>
                </label>
            </div>
        </>
    );
}

export default InputFile;
