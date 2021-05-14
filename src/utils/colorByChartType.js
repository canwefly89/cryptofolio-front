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
const colorByChartType = (circles, chartType = CHART_TYPE.EXCHANGE) => {
  if (chartType === CHART_TYPE.EXCHANGE) {
    circles
      .filter((d) => d.exchanges?.includes("upbit"))
      .attr("fill", COLORS.UPBIT);
    circles
      .filter((d) => d.exchanges?.includes("binance"))
      .attr("fill", COLORS.BINANCE);
    circles
      .filter((d) => d.exchanges?.length === 2)
      .attr("fill", COLORS.BOTH_EXCHANGE);
  }

  if (chartType === CHART_TYPE.CATEGORY) {
    const color = d3.scaleOrdinal(d3["schemeSet2"]);
    color.domain(CATEGORIES);
    circles.attr("fill", (d) => color(d.categories[0]));
  }

  if (chartType === CHART_TYPE.PORTFOLIO) {
    const color = d3.scaleOrdinal(d3["schemeSet3"]);
    color.domain(PORTFOLIOS);
    circles.attr("fill", (d) =>
      d.portfolios.length > 0 ? color(d.portfolios[0]) : "gray"
    );
  }
};

export default colorByChartType;
