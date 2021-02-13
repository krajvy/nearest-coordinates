import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import setMapDistance from './../state/actions/setMapDistance';

import InputNumber from './input/InputNumber';
import Button from './button/Button';

const MapForm = props => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <fieldset>
        <legend>Map operations</legend>
        <div>
          <InputNumber
            label="Distance to check (in km)"
            name="map_range"
            onChange={props.setMapDistance}
            required={true}
            min={0}
            value={props.mapDistance}
          />
          <Button
            name="map_range"
            value="Check"
          />
        </div>
        <Button
          name="map_load"
          value="Load map with selected points"
        />
      </fieldset>
      <div className="map--canvas hidden"></div>
    </form>
  );
};

MapForm.propTypes = {
  mapDistance: PropTypes.number,
  setMapDistance: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    mapDistance: state.mapDistance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMapDistance: payload => dispatch(setMapDistance(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapForm);
