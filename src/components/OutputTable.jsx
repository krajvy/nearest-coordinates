import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import setDisplayOnMap from './../state/actions/setDisplayOnMap';

import InputCheckbox from './input/InputCheckbox';

import formatCoordinates from '../functions/format/formatCoordinates';

const Arrow = styled.span`
  position: absolute;
  transform: rotate(${props => props.azimuth - 90}deg);
`;
const Azimuth = styled.span`
  margin-left: 1.2em;
`;

const OutputTable = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Coordinates</th>
          <th>Distance</th>
          <th>Azimuth</th>
          <th>Description</th>
          <th>Map</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => {
          return (
            <tr key={index}>
              <td className="coordinates">{formatCoordinates(row.latitude, row.longitude)}</td>
              <td className="distance">
                {row.distance > 50 ? parseInt(row.distance, 10) : row.distance} km
              </td>
              <td className="azimuth">
                <Arrow azimuth={row.azimuth}>&#10140;</Arrow>
                <Azimuth>{row.azimuth}</Azimuth>
              </td>
              <td className="description">{row.description}</td>
              <td className="map">
                <InputCheckbox
                  name={'map-' + index}
                  onChange={e => { props.setDisplayOnMap(e, index); }}
                  checked={row.displayOnMap}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

OutputTable.propTypes = {
  data: PropTypes.array,
  setDisplayOnMap: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDisplayOnMap: (payload, index) => dispatch(setDisplayOnMap(payload, index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutputTable);
