/* eslint-disable indent */
import { CHART_TYPE } from "../constants/constants";
import { tip as d3tip } from "d3-v6-tip";
import setNumberFormat from "./setNumberFormat";
/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */
const createToolTip = (chartType, coinData) => {
  if (
    chartType === CHART_TYPE.PORTFOLIO ||
    chartType === CHART_TYPE.MYPORTFOLIO
  ) {
    return d3tip()
      .attr("class", "tooltip")
      .style("left", "0px")
      .style("top", "0px")
      .html((event, d) => {
        d = coinData[d.name];
        return `<div>
				<img src=${d?.imagePath}></img>
				<span class="name">&nbsp;&nbsp;${d.name.toUpperCase()}</span>
				<div class="ticker">${d.ticker}</div>
				<div class="info">
					<span>Ciculating Supply</span> <span>${setNumberFormat(
            d.circulatingSupply,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Market Cap</span> <span>${setNumberFormat(
            d.marketCap?.marketCap,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Price</span> <span>${setNumberFormat(d.price?.price)}</span>
				</div>
				<div class="info">
					<span>Category</span> <span>${d.categories?.slice(0, 3)}</span>
				</div>
				<div class="info">
					<span>Portfolio</span> <span>${d.portfolios?.slice(0, 2)}</span>
				</div>
				<div class="info">
					<span>Exchange</span> <span>${d.exchanges}</span>
				</div>
      </div>`;
      });
  } else {
    return d3tip()
      .attr("class", "tooltip")
      .style("left", "0px")
      .style("top", "0px")
      .html((event, d) => {
        return `<div>
				<img src=${d?.imagePath}></img>
				<span class="name">&nbsp;&nbsp;${d.name.toUpperCase()}</span>
				<div class="ticker">${d.ticker}</div>
				<div class="info">
					<span>Ciculating Supply</span> <span>${setNumberFormat(
            d.circulatingSupply,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Market Cap</span> <span>${setNumberFormat(
            d.marketCap?.marketCap,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Price</span> <span>${setNumberFormat(d.price?.price)}</span>
				</div>
				<div class="info">
					<span>Category</span> <span>${d.categories.slice(0, 3)}</span>
				</div>
				<div class="info">
					<span>Portfolio</span> <span>${d.portfolios.slice(0, 2)}</span>
				</div>
				<div class="info">
					<span>Exchange</span> <span>${d.exchanges}</span>
				</div>
      </div>`;
      });
  }
};

export default createToolTip;
