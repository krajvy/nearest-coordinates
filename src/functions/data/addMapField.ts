import type { MapFieldRow } from '@/types';

const addMapField = (data: MapFieldRow[]): MapFieldRow[] =>
  data.map((row) => {
    row.displayOnMap = false;
    return row;
  });

export default addMapField;
