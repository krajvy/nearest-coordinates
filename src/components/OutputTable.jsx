import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formatCoordinates from './../functions/formatCoordinates';

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
              <td className="distance"></td>
              <td className="azimuth"></td>
              <td className="description">{row.description}</td>
              <td className="map"></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

OutputTable.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

export default connect(
  mapStateToProps,
)(OutputTable);
