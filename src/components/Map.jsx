import React from 'react';

import InputText from './input/InputText';
import Button from './button/Button';

function Map () {
  return (
    <>
      <fieldset>
        <legend>Map operations</legend>
        <div>
          <InputText
            label="Distance to check (in km)"
            name="map_range"
            value="50"
          />
          <Button
            name="map_range"
            value="Check"
          />
        </div>
        <Button
          name="map_load"
          value="Load map with selected points"
        />
      </fieldset>
      <div className="map--canvas hidden"></div>
    </>
  );
}

export default Map;
