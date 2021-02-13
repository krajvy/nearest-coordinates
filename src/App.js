import React from 'react';

import InputForm from './components/InputForm';
import MapForm from './components/MapForm';
import OutputTable from './components/OutputTable';

const App = () => {
  return (
    <div className="App">
      <InputForm />
      <MapForm />
      <OutputTable />
    </div>
  );
};

export default App;
