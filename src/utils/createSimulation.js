import * as d3 from "d3";
import {
  CHART_SIZE,
  CHART_TYPE,
  CIRCLE_TYPE,
  VIEW_TYPE,
} from "../constants/constants";
import createRadiusScale from "./createRadiusScale";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */
const width = CHART_SIZE.BUBBLE_WIDTH;
const height = CHART_SIZE.BUBBLE_HEIGHT;

const createSimulation = (
  chartType = CHART_TYPE.EXCHANGE,
  circleType = CIRCLE_TYPE.MARKETCAP,
  viewType = VIEW_TYPE.BASIC
) => {
  const radiusScale = createRadiusScale(circleType);
  let forceX;
  let forceY;

  if (chartType === CHART_TYPE.EXCHANGE) {
    if (viewType === VIEW_TYPE.SEPARATE) {
      forceX = d3
        .forceX((d) => {
          if (d.exchanges?.length === 2) return width / 2 - 180;
          if (d.exchanges?.includes("upbit")) return 130;
          if (d.exchanges?.includes("binance")) return width - 280;
        })
        .strength(0.1);

      forceY = d3
        .forceY((d) => {
          if (d.exchanges?.length === 2) return height / 2 - 50;
          if (d.exchanges?.includes("upbit")) return 200;
          if (d.exchanges?.includes("binance")) return height - 300;
        })
        .strength(0.1);
    }

    if (viewType === VIEW_TYPE.BASIC) {
      forceX = d3.forceX(width / 2).strength(0.05);
      forceY = d3.forceY(height / 2).strength(0.05);

      if (circleType === CIRCLE_TYPE.PRICE) {
        forceX = d3.forceX(width / 2).strength(0.01);
        forceY = d3.forceY(height / 2).strength(0.01);
      }
    }

    if (circleType === CIRCLE_TYPE.MARKETCAP) {
      return d3
        .forceSimulation()
        .force("x", forceX)
        .force("y", forceY)
        .force(
          "collide",
          d3.forceCollide((d) => radiusScale(d.marketCap?.marketCap) + 3)
        );
    }

    if (circleType === CIRCLE_TYPE.PRICE) {
      return d3
        .forceSimulation()
        .force("x", forceX)
        .force("y", forceY)
        .force(
          "collide",
          d3.forceCollide((d) => radiusScale(d.price?.price) + 3)
        );
    }
  }

  if (chartType === CHART_TYPE.CATEGORY) {
    forceX = d3.forceX(width / 2).strength(0.02);
    forceY = d3.forceY(height / 2).strength(0.02);

    if (circleType === CIRCLE_TYPE.MARKETCAP) {
      return d3
        .forceSimulation()
        .force("x", forceX)
        .force("y", forceY)
        .force(
          "collide",
          d3.forceCollide((d) => radiusScale(d.marketCap?.marketCap) + 3)
        );
    }
    if (circleType === CIRCLE_TYPE.PRICE) {
      return d3
        .forceSimulation()
        .force("x", forceX)
        .force("y", forceY)
        .force(
          "collide",
          d3.forceCollide((d) => radiusScale(d.price?.price) + 3)
        );
    }
  }
};

export default createSimulation;
