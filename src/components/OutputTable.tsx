import styled from 'styled-components';
import type { DataRowBase, DataTableRow } from '@/types';
import { useAppContext } from '@/state/appContext';
import sortByDistance from '@/functions/math/sortByDistance';
import formatCoordinates from '@/functions/format/formatCoordinates';
import InputCheckbox from '@/components/input/InputCheckbox';
import displayOnMapChecked from '@/state/actions/displayOnMapChecked';

type StyledArrowProps = {
  azimuth: number;
};

const StyledArrow = styled.span<StyledArrowProps>`
  position: absolute;
  transform: rotate(${(props) => props.azimuth - 90}deg);
`;
const StyledAzimuth = styled.span`
  margin-left: 1.2em;
`;

const StyledTable = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 1em;
  line-height: 1.5em;
  overflow-x: auto;
  width: 100%;

  thead tr {
    background-color: #efefef;
    border: 1px solid #ddd;
    letter-spacing: 0.1em;
  }
  tr {
    border: 1px solid #ddd;
  }
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  th,
  td {
    padding: 0.3em;
  }

  @media screen and (max-width: 600px) {
    border: 0;

    thead {
      display: none;
    }
    tr {
      display: block;
      margin-bottom: 0.625em;
    }
    td {
      border-bottom: 1px solid #ddd;
      display: block;
      text-align: left;
      width: calc(100% - 0.6em);

      &:last-child {
        border-bottom: 0;
      }
      &::before {
        content: attr(data-label) ':';
        float: left;
        font-weight: bold;
        width: 6.5em;
      }
      input {
        width: calc(100% - 8em);
      }
    }
  }
`;

const StyledTdCoordinates = styled.td`
  text-align: center;
  width: 10em;
`;

const StyledTdDistance = styled.td`
  text-align: right;
  width: 5em;
`;

const StyledTdAzimuth = styled.td`
  text-align: center;
  width: 4em;
`;

const StyledTdMap = styled.td`
  text-align: center;
  width: 2em;
`;

const OutputTable = () => {
  const { state, dispatch } = useAppContext();

  const setDisplayOnMap = (rowId: DataRowBase['rowId']) => displayOnMapChecked(rowId, dispatch);

  let tableData: DataTableRow[] = [];
  if (state.filesParsedData) {
    tableData = sortByDistance(state.filesParsedData);
  }

  return (
    <fieldset>
      <legend>Output table</legend>
      <StyledTable>
        <thead>
          <tr>
            <th>Coordinates</th>
            <th>Distance</th>
            <th>Azimuth</th>
            <th>Description</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length > 0 && tableData.map((row, index) => {
            return (
              <tr className="cyOutputTableRow" key={index}>
                <StyledTdCoordinates data-label="Coordinates">
                  {formatCoordinates(Number(row.latitude), Number(row.longitude))}
                </StyledTdCoordinates>
                <StyledTdDistance data-label="Distance">
                  {row.distance > 50
                    ? Math.floor(row.distance)
                    : row.distance}{' '}
                  km
                </StyledTdDistance>
                <StyledTdAzimuth data-label="Azimuth">
                  <StyledArrow azimuth={row.azimuth}>&#10140;</StyledArrow>
                  <StyledAzimuth className="cyOutputTableRowAzimuth">
                    {row.azimuth.toString().padStart(3, '0')} °
                  </StyledAzimuth>
                </StyledTdAzimuth>
                <td data-label="Description">{row.description}</td>
                <StyledTdMap data-label="Map">
                  <InputCheckbox
                    name={'map-' + index}
                    onChange={() => {
                      setDisplayOnMap(row.rowId);
                    }}
                    checked={Boolean(row.displayOnMap)}
                  />
                </StyledTdMap>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </fieldset>
  );
};

export default OutputTable;
