import {
  CHART_TYPE,
  COLORS,
  CATEGORIES,
  PORTFOLIOS,
} from "../constants/constants";
import * as d3 from "d3";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */
const setCircleColor = (d, chartType) => {
  if (chartType === CHART_TYPE.EXCHANGE) {
    if (d.exchanges.length === 2) {
      return COLORS.BOTH_EXCHANGE;
    } else if (d.exchanges.includes("binance")) {
      return COLORS.BINANCE;
    } else {
      return COLORS.UPBIT;
    }
  }

  if (chartType === CHART_TYPE.CATEGORY) {
    const color = d3.scaleOrdinal(d3["schemeSet2"]);
    color.domain(CATEGORIES);
    return color(d.categories[0]);
  }

  if (chartType === CHART_TYPE.PORTFOLIO) {
    const color = d3.scaleOrdinal(d3["schemeSet3"]);
    color.domain(PORTFOLIOS);
    return d.portfolios.length > 0 ? color(d.portfolios[0]) : "gray";
  }
};

export default setCircleColor;
