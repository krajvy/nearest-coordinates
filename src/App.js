import React from 'react';

import InputForm from './components/InputForm';
import MapForm from './components/MapForm';
import OutputTable from './components/OutputTable';
import Help from './components/Help';

const App = () => {
  return (
    <div className="App">
      <Help />
      <InputForm />
      <MapForm />
      <OutputTable />
    </div>
  );
};

export default App;
