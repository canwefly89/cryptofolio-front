/**
 *
 * @param {number} value target Number
 * @param {string} unit unit
 * @returns changed Value
 */
const changeDollarWon = (value, unit = "dollar") => {
  if (unit === "dollar") {
    return value * 1120;
  }

  if (unit === "won") {
    return parseFloat((value / 1120).toFixed(2));
  }
};

export default changeDollarWon;
