import InputText from '@/components/input/InputText';
import InputFile from '@/components/input/InputFile';
import Table from '@/components/table/Table';
import SubmitButton from '@/components/form/SubmitButton';
import { COORDSPATTERN } from '@/functions/validator/coordspattern';
import { useAppContext } from '@/state/appContext';
import inputFormSubmit from '@/state/actions/inputFormSubmit';

const InputForm = () => {
  const { state, dispatch } = useAppContext();

  const formSubmit = (formData: FormData) => inputFormSubmit(formData, state, dispatch);

  const filesTable = state.filesIn ? (
    <div>
      <label>
        Loaded POI files:
        <Table className="cyFilesTable" heading={['Name', 'Size (bytes)']} data={state.filesIn.map(file => [file.name, file.size])} />
      </label>
    </div>
  ) : null;

  return (
    <form
      className="form form--input"
      action={formSubmit}
    >
      <fieldset>
        <legend>Input</legend>
        <InputText
          className="cyCoordinatesIn"
          label="Your coordinates"
          name="coord_in"
          pattern={COORDSPATTERN}
          required={true}
          defaultValue={state.coordIn}
        />
        <InputFile
          className="cyFilesIn"
          label="Files with POIs"
          multiple={true}
          name="files_in"
          accept="text/*"
          required={ state.filesIn ? false : true }
        />
        {filesTable}
        <SubmitButton
          className="cyReadData"
          value={ state.filesIn ? 'Reload data' : 'Read data' }
          valuePending="Processing..."
        />
      </fieldset>
    </form>
  );
};

export default InputForm;
