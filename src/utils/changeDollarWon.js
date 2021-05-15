/**
 *
 * @param {number} number target Number
 * @param {type} string format type
 * @returns Created audioContext
 */
const changeDollarWon = (value, type = "dollar") => {
  if (type === "dollar") {
    return value * 1120;
  }

  if (type === "won") {
    return parseFloat((value / 1120).toFixed(2));
  }
};

export default changeDollarWon;
