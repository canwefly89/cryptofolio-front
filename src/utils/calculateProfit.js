/**
 *
 * @param {array} cryptofolioList
 * @param {object} coinData
 * @returns {array} calculatedList
 */
const calculateProfit = (cryptofolioList = [], coinData = {}) => {
  const caculatedList = cryptofolioList.map((cryptofolio) => {
    if (!cryptofolio) {
      // eslint-disable-next-line array-callback-return
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

  return caculatedList;
};

export default calculateProfit;
