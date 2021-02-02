const precisionRound = (what, accuracy) => {
  accuracy = Math.pow(10, accuracy);
  return Math.round(what * accuracy) / accuracy;
};

export default precisionRound;
