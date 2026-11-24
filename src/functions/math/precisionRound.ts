const precisionRound = (what: number, accuracy: number): number => {
  accuracy = Math.pow(10, accuracy);
  return Math.round(what * accuracy) / accuracy;
};

export default precisionRound;
