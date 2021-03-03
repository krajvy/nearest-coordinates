import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import setDisplayOnMap from './../state/actions/setDisplayOnMap';

import InputCheckbox from './input/InputCheckbox';

import formatCoordinates from '../functions/format/formatCoordinates';

const StyledArrow = styled.span`
  position: absolute;
  transform: rotate(${(props) => props.azimuth - 90}deg);
`;
const StyledAzimuth = styled.span`
  margin-left: 1.2em;
`;

const StyledTable = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  overflow-x: auto;
  width: 100%;
  thead tr {
    background-color: #efefef;
    border: 1px solid #ddd;
    letter-spacing: 0.1em;
  }
  tr {
    border: 1px solid #ddd;
  }
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  th,
  td {
    padding: 0.3em;
  }
`;

const StyledTdCoordinates = styled.td`
  text-align: center;
  width: 10em;
`;

const StyledTdDistance = styled.td`
  text-align: right;
  width: 5em;
`;

const StyledTdAzimuth = styled.td`
  text-align: center;
  width: 4em;
`;

const StyledTdMap = styled.td`
  text-align: center;
  width: 2em;
`;

const OutputTable = (props) => {
  return (
    <fieldset>
      <legend>Output table</legend>
      <StyledTable>
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
                <StyledTdCoordinates>
                  {formatCoordinates(row.latitude, row.longitude)}
                </StyledTdCoordinates>
                <StyledTdDistance>
                  {row.distance > 50
                    ? parseInt(row.distance, 10)
                    : row.distance}{' '}
                  km
                </StyledTdDistance>
                <StyledTdAzimuth>
                  <StyledArrow azimuth={row.azimuth}>&#10140;</StyledArrow>
                  <StyledAzimuth>
                    {row.azimuth.toString().padStart(3, 0)} °
                  </StyledAzimuth>
                </StyledTdAzimuth>
                <td>{row.description}</td>
                <StyledTdMap>
                  <InputCheckbox
                    name={'map-' + index}
                    onChange={(e) => {
                      props.setDisplayOnMap(e, index);
                    }}
                    checked={row.displayOnMap}
                  />
                </StyledTdMap>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </fieldset>
  );
};

OutputTable.propTypes = {
  data: PropTypes.array,
  setDisplayOnMap: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayOnMap: (payload, index) =>
      dispatch(setDisplayOnMap(payload, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutputTable);
