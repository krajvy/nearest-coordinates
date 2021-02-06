const addMapField = data => data.map(row => {
  row.displayOnMap = false;
  return row;
});

export default addMapField;
