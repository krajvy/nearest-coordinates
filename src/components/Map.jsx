import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import styled from 'styled-components';

import markerGreen from '../icons/marker-green.png';
import markerRed from '../icons/marker-red.png';
import markerShadow from '../icons/marker-shadow.png';

const Container = styled.fieldset`
  height: 90vh;
`;

const iconBasic = {
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  tooltipAnchor: [12, -28],
  shadowUrl: markerShadow,
  shadowSize: [40, 40],
  shadowAnchor: [12, 40],
};

const iconGreen = new Icon({
  ...iconBasic,
  iconUrl: markerGreen,
});

const iconRed = new Icon({
  ...iconBasic,
  iconUrl: markerRed,
});

const Map = props => {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <Container>
      <legend>Map</legend>
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={props.zoom}
        style={{ height: '100%' }}
      >
        <Marker
          icon={iconGreen}
          position={[props.latitude, props.longitude]}
        >
          <Tooltip>Your coordinates</Tooltip>
        </Marker>

        {props.points.map((row, index) => (
          <Marker
            icon={iconRed}
            key={index}
            position={[row.latitude, row.longitude]}
            eventHandlers={{
              click: () => setActivePoint(row),
            }}
          >
            <Tooltip>{row.description}</Tooltip>
          </Marker>
        ))}
        {activePoint && (
          <Popup
            position={[activePoint.latitude, activePoint.longitude]}
            onClose={() => setActivePoint(null)}
          >
            {activePoint.description}
          </Popup>
        )}

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
  points: PropTypes.array,
};

Map.defaultProps = {
  zoom: 13,
};

export default Map;
