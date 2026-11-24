import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import { Icon, type BaseIconOptions } from 'leaflet';
import styled from 'styled-components';

import markerGreen from '@/icons/marker-green.png';
import markerRed from '@/icons/marker-red.png';
import markerShadow from '@/icons/marker-shadow.png';
import type { DataTableRow } from '@/types';

export type MapProps = {
  zoom?: number;
  latitude: number;
  longitude: number;
  points: DataTableRow[];
};

const Container = styled.fieldset`
  height: 90vh;
`;

const iconBasic: BaseIconOptions = {
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

const Map = ({ zoom = 11, latitude, longitude, points }: MapProps) => {
  return (
    <Container className="cyMapContainer">
      <legend>Map</legend>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: '100%' }}
      >
        <Marker icon={iconGreen} position={[latitude, longitude]}>
          <Tooltip>Your coordinates</Tooltip>
        </Marker>

        {points.map((row, index) => (
          <Marker
            icon={iconRed}
            key={index}
            position={[row.latitude as number, row.longitude as number]}
          >
            <Tooltip>{row.description}</Tooltip>
            <Popup>{row.description}</Popup>
          </Marker>
        ))}

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Container>
  );
};

export default Map;
