import React from 'react';

import InputText from './input/InputText';
import InputFile from './input/InputFile';
import InputSubmit from './input/InputSubmit';

function InputForm () {
  return (
    <fieldset>
      <legend>Input</legend>
      <InputText
        label="Your coordinates"
        name="coord_in"
      />
      <InputFile
        label="Input file"
        name="file_in"
      />
      <InputSubmit
        value="Process"
      />
    </fieldset>
  );
}

export default InputForm;
