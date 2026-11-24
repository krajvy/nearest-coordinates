import { AppProvider } from '@/state/appProvider';
import InputForm from '@/components/InputForm';
import MapForm from '@/components/MapForm';
import OutputTable from '@/components/OutputTable';
import Help from '@/components/Help';
import ErrorBoundary from '@/error/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="App">
          <Help />
          <InputForm />
          <MapForm />
          <OutputTable />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
