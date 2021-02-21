import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import setMapDistance from './../state/actions/setMapDistance';
import setDisplayOnMapByDistance from './../state/actions/setDisplayOnMapByDistance';

import InputNumber from './input/InputNumber';
import InputSubmit from './input/InputSubmit';
import Button from './button/Button';
import Map from './Map';

const MapForm = props => {
  const [showMap, setShowMap] = useState(false);

  const mapContainer =
    showMap &&
    !props.noData &&
    props.coordInParsed.latitude &&
    props.coordInParsed.longitude
      ? <Map
        latitude={props.coordInParsed.latitude}
        longitude={props.coordInParsed.longitude}
        zoom={11}
        points={props.data.filter(row => row.displayOnMap)}
      />
      : null;

  return (
    <>
      <form className="form form--map" onSubmit={event => event.preventDefault()}>
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
            value="Show map"
            onClick={() => setShowMap(true)}
          />
          <Button
            disabled={props.noData}
            name="map_hide"
            value="Hide map"
            onClick={() => setShowMap(false)}
          />
        </fieldset>
      </form>
      {mapContainer}
    </>
  );
};

MapForm.propTypes = {
  coordInParsed: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  data: PropTypes.array,
  noData: PropTypes.bool,
  mapDistance: PropTypes.number,
  setMapDistance: PropTypes.func,
  setDisplayOnMapByDistance: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    mapDistance: state.mapDistance,
    noData: state.data.length === 0,
    coordInParsed: state.coordInParsed,
    data: state.data,
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
