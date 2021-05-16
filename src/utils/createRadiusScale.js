import * as d3 from "d3";
import {
  MARKETCAP_RANGE,
  CIRCLE_TYPE,
  PRICE_RANGE,
  AMOUNT_RANGE,
  VALUE_RANGE,
} from "../constants/constants";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */

const createRadiusScale = (circleType = CIRCLE_TYPE.MARKETCAP) => {
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
    return d3
      .scaleSqrt()
      .domain([AMOUNT_RANGE.MIN, AMOUNT_RANGE.MAX])
      .range([30, 300]);
  }

  if (circleType === CIRCLE_TYPE.VALUE) {
    return d3
      .scaleSqrt()
      .domain([VALUE_RANGE.MIN, VALUE_RANGE.MAX])
      .range([10, 150]);
  }
};

export default createRadiusScale;
