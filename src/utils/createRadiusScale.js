import * as d3 from "d3";
import {
  MARKETCAP_RANGE,
  CIRCLE_TYPE,
  PRICE_RANGE,
} from "../constants/constants";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */

const createRadiusScale = (circleType = CIRCLE_TYPE.MARKETCAP, data) => {
  if (circleType === CIRCLE_TYPE.MARKETCAP) {
    return d3
      .scaleSqrt()
      .domain([MARKETCAP_RANGE.MIN, MARKETCAP_RANGE.MAX])
      .range([8, 250]);
  }

  if (circleType === CIRCLE_TYPE.PRICE) {
    return d3
      .scaleSqrt()
      .domain([PRICE_RANGE.MIN, PRICE_RANGE.MAX])
      .range([8, 250]);
  }

  if (circleType === CIRCLE_TYPE.AMOUNT) {
    const max = Math.max(...data.map((item) => item.amount));
    const min = Math.min(...data.map((item) => item.amount));

    return d3.scaleSqrt().domain([min, max]).range([10, 120]);
  }

  if (circleType === CIRCLE_TYPE.VALUE) {
    const max = Math.max(...data.map((item) => item.value));
    const min = Math.min(...data.map((item) => item.value));

    return d3.scaleSqrt().domain([min, max]).range([10, 120]);
  }
};

export default createRadiusScale;
