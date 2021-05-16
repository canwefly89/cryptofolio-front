/**
 *
 * @param {number} number target Number
 * @param {type} string format type
 * @returns Created audioContext
 */
const calculateProfit = (array = [], coinData = {}) => {
  const caculated = array.map((cryptofolio) => {
    if (!cryptofolio) {
      return;
    }
    let currentValue = 0;

    cryptofolio.selectedList.forEach((coin) => {
      if (coin.amount.length > 0) {
        currentValue +=
          coinData[coin.name]?.price.price * parseInt(coin.amount, 10);
      }
    });
    cryptofolio.currentValue = currentValue;
    cryptofolio.profit = currentValue - cryptofolio.createdValue;
    cryptofolio.profitPercent = parseFloat(
      (currentValue / cryptofolio.createdValue - 1).toFixed(2)
    );

    return cryptofolio;
  });

  return caculated;
};

export default calculateProfit;
