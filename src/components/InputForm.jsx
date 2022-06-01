import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';

import setCoordIn from './../state/actions/setCoordIn';
import setFilesIn from './../state/actions/setFilesIn';
import readData from './../state/actions/readData';

import InputText from './input/InputText';
import InputFile from './input/InputFile';
import InputSubmit from './input/InputSubmit';

import { COORDSPATTERN } from '../functions/validator/coordspattern';

const InputForm = (props) => {
  return (
    <form
      className="form form--input"
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset>
        <legend>Input</legend>
        <LoadingMask loading={props.isLoading} text="Processing data...">
          <InputText
            className="cyCoordinatesIn"
            label="Your coordinates"
            name="coord_in"
            onChange={props.setCoordIn}
            pattern={COORDSPATTERN}
            required={true}
            value={props.coordIn}
          />
          <InputFile
            className="cyFilesIn"
            label="Input files"
            multiple={true}
            name="files_in"
            required={true}
            onChange={props.setFilesIn}
            value={props.filesIn}
          />
          <InputSubmit
            className="cyReadData"
            disabled={props.isLoading}
            value="Read data"
            onClick={props.readData}
          />
        </LoadingMask>
      </fieldset>
    </form>
  );
};

InputForm.propTypes = {
  coordIn: PropTypes.string,
  filesIn: PropTypes.string,
  isLoading: PropTypes.bool,
  setCoordIn: PropTypes.func,
  setFilesIn: PropTypes.func,
  readData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    coordIn: state.coordIn,
    filesIn: state.filesIn,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCoordIn: (payload) => dispatch(setCoordIn(payload)),
    setFilesIn: (payload) => dispatch(setFilesIn(payload)),
    readData: (payload) => dispatch(readData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
