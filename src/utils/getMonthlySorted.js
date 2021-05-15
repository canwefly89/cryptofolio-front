import dayjs from "dayjs";
import calculateProfit from "./calculateProfit";
/**
 *
 * @param {number} number target Number
 * @param {type} string format type
 * @returns Created audioContext
 */
const getMonthlySorted = (array = [], coinData = {}) => {
  return calculateProfit(array, coinData)
    .filter(
      (portfolio) =>
        new Date(dayjs(portfolio.createdAt)) -
          new Date(dayjs(Date.now()).add(-1, "month")) >
        0
    )
    .sort((a, b) => b.profitPercent - a.profitPercent);
};

export default getMonthlySorted;
