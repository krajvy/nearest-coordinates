import { useState } from 'react';
import { useAppContext } from '@/state/appContext';
import displayOnMapByDistance from '@/state/actions/displayOnMapByDistance';
import Map from '@/components/Map';
import InputNumber from '@/components/input/InputNumber';
import InputSubmit from '@/components/input/InputSubmit';
import Button from '@/components/button/Button';
import type { DataTableRow } from '@/types';

const MapForm = () => {
  const { state, dispatch } = useAppContext();

  const anyData = state.filesParsedData?.length;

  const [showMap, setShowMap] = useState(false);

  const mapFormSubmit = (formData: FormData) => displayOnMapByDistance(formData, dispatch);

  const mapContainer =
    showMap &&
    anyData &&
    state.coordInParsed?.latitude &&
    state.coordInParsed?.longitude ? (
      <Map
        latitude={state.coordInParsed.latitude as number}
        longitude={state.coordInParsed.longitude as number}
        zoom={11}
        points={state.filesParsedData?.filter((row) => row.displayOnMap) as DataTableRow[]}
      />
    ) : null;

  return (
    <>
      <form
        className="form form--map"
        action={mapFormSubmit}
      >
        <fieldset>
          <legend>Map operations</legend>
          <div>
            <InputNumber
              className="cyMapRange"
              label="Distance to check (in km)"
              name="map_range"
              required={true}
              min={1}
              defaultValue={state.mapDistance}
            />
            <InputSubmit
              className="cyMapRangeCheck"
              disabled={!anyData}
              value="Check"
            />
          </div>
          <Button
            className="cyMapShow"
            disabled={!anyData || showMap}
            name="map_load"
            value="Show map"
            onClick={() => setShowMap(true)}
          />
          <Button
            className="cyMapHide"
            disabled={!anyData || !showMap}
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

export default MapForm;
