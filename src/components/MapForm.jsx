import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import setMapDistance from './../state/actions/setMapDistance';
import setDisplayOnMapByDistance from './../state/actions/setDisplayOnMapByDistance';

import InputNumber from './input/InputNumber';
import InputSubmit from './input/InputSubmit';
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
          <InputSubmit
            disabled={props.noData}
            value="Check"
            onClick={props.setDisplayOnMapByDistance}
          />
        </div>
        <Button
          disabled={props.noData}
          name="map_load"
          value="Load map with selected points"
        />
      </fieldset>
      <div className="map--canvas hidden"></div>
    </form>
  );
};

MapForm.propTypes = {
  noData: PropTypes.bool,
  mapDistance: PropTypes.number,
  setMapDistance: PropTypes.func,
  setDisplayOnMapByDistance: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    mapDistance: state.mapDistance,
    noData: state.data.length === 0,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMapDistance: payload => dispatch(setMapDistance(payload)),
    setDisplayOnMapByDistance: payload => dispatch(setDisplayOnMapByDistance(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapForm);
