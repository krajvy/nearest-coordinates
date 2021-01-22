import React from 'react';

import NCState from './context/NCState';

import InputForm from './components/InputForm';
import Map from './components/Map';
import OutputTable from './components/OutputTable';

const App = () => {
  return (
    <div className="App">
      <NCState>
        <InputForm />
        <Map />
        <OutputTable />
      </NCState>
    </div>
  );
};

export default App;
