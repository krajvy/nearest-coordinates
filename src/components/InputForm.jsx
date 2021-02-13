import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingMask from 'react-loadingmask';
import 'react-loadingmask/dist/react-loadingmask.css';

import setCoordIn from './../state/actions/setCoordIn';
import setFileIn from './../state/actions/setFileIn';
import readData from './../state/actions/readData';

import InputText from './input/InputText';
import InputFile from './input/InputFile';
import InputSubmit from './input/InputSubmit';

import { COORDSPATTERN } from '../functions/validator/coordspattern';

const InputForm = props => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <fieldset>
        <legend>Input</legend>
        <LoadingMask loading={props.isLoading} text="Processing data...">
          <InputText
            label="Your coordinates"
            name="coord_in"
            onChange={props.setCoordIn}
            pattern={COORDSPATTERN}
            required={true}
            value={props.coordIn}
          />
          <InputFile
            label="Input file"
            name="file_in"
            required={true}
            onChange={props.setFileIn}
            value={props.fileIn}
          />
          <InputSubmit
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
  fileIn: PropTypes.string,
  isLoading: PropTypes.bool,
  setCoordIn: PropTypes.func,
  setFileIn: PropTypes.func,
  readData: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    coordIn: state.coordIn,
    fileIn: state.fileIn,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCoordIn: payload => dispatch(setCoordIn(payload)),
    setFileIn: payload => dispatch(setFileIn(payload)),
    readData: payload => dispatch(readData(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputForm);
