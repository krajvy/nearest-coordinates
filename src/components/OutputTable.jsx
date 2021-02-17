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

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  th, td {
    border: 1px solid black;
    padding-left: 0.3em;
    padding-right: 0.3em;
  }
`;

const TdCoordinates = styled.td`
  text-align: center;
  width: 10em;
`;

const TdDistance = styled.td`
  text-align: right;
  width: 5em;
`;

const TdAzimuth = styled.td`
  text-align: center;
  width: 4em;
`;

const TdMap = styled.td`
  text-align: center;
  width: 2em;
`;

const OutputTable = props => {
  return (
    <fieldset>
      <legend>Output table</legend>
      <Table>
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
                <TdCoordinates>{formatCoordinates(row.latitude, row.longitude)}</TdCoordinates>
                <TdDistance>
                  {row.distance > 50 ? parseInt(row.distance, 10) : row.distance} km
                </TdDistance>
                <TdAzimuth>
                  <Arrow azimuth={row.azimuth}>&#10140;</Arrow>
                  <Azimuth>{row.azimuth.toString().padStart(3, 0)}</Azimuth>
                </TdAzimuth>
                <td>{row.description}</td>
                <TdMap>
                  <InputCheckbox
                    name={'map-' + index}
                    onChange={e => { props.setDisplayOnMap(e, index); }}
                    checked={row.displayOnMap}
                  />
                </TdMap>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </fieldset>
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
