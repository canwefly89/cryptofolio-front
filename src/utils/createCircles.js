import { CIRCLE_TYPE } from "../constants/constants";
import createRadiusScale from "./createRadiusScale";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */

const createCircles = (svg, array, circleType = CIRCLE_TYPE.MARKETCAP) => {
  let radiusScale = createRadiusScale(circleType);
  svg.selectAll("g").remove();

  const baseGroup = svg.selectAll("g").data(array);
  const circleGroup = baseGroup
    .enter()
    .append("g")
    .attr("transform", "translate(0,0)");

  if (circleType === CIRCLE_TYPE.MARKETCAP) {
    return circleGroup
      .append("circle")
      .attr("r", (d) =>
        d.marketCap ? radiusScale(d.marketCap?.marketCap) : 10
      );
  }

  if (circleType === CIRCLE_TYPE.PRICE) {
    return circleGroup
      .append("circle")
      .attr("r", (d) => (d.price ? radiusScale(d.price?.price) : 10));
  }
};

export default createCircles;
