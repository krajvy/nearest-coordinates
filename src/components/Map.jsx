import 'leaflet/dist/leaflet.css';

import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

const Container = styled.fieldset`
  height: 90vh;
`;

const Map = props => {
  return (
    <Container>
      <legend>Map</legend>
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={props.zoom}
        style={{ height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Container>
  );
};

Map.propTypes = {
  zoom: PropTypes.number,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

Map.defaultProps = {
  zoom: 13,
};

export default Map;
