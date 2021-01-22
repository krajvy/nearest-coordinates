import React, { useContext } from 'react';

import NCContext from './../context/NCContext';

import InputText from './input/InputText';
import InputFile from './input/InputFile';
import InputSubmit from './input/InputSubmit';

const InputForm = () => {
  const context = useContext(NCContext);

  return (
    <fieldset>
      <legend>Input</legend>
      <InputText
        label="Your coordinates"
        name="coord_in"
        onChange={context.setCoordIn}
        value={context.state.coordIn}
      />
      <InputFile
        label="Input file"
        name="file_in"
        onChange={context.setFileIn}
        value={context.state.fileIn}
      />
      <InputSubmit
        value="Process"
      />
    </fieldset>
  );
};

export default InputForm;
