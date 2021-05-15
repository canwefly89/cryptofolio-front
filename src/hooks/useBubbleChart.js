import { useEffect, useCallback } from "react";

import * as d3 from "d3";
import { COLORS, CHART_SIZE, VIEW_TYPE } from "../constants/constants";
import setCircleColor from "../utils/setCircleColor";
import colorByChartType from "../utils/colorByChartType";
import createToolTip from "../utils/createToolTip";
import createSimulation from "../utils/createSimulation";
import createCircles from "../utils/createCircles";

/**
 *
 * @param {String, array, object}
 *
 */
const width = CHART_SIZE.BUBBLE_WIDTH;
const height = CHART_SIZE.BUBBLE_HEIGHT;
const t = d3.transition().duration(500);
const tip = createToolTip();

const useBubbleChart = (
  svgRef,
  coinData,
  chartType,
  circleType,
  viewType = VIEW_TYPE.BASIC
) => {
  const handleMouseOver = useCallback((event, d) => {
    tip.show(event, d);
    d3.select(event.currentTarget)
      .transition(() => t)
      .attr("fill", COLORS.MOUSEOVER_TARGET);
  }, []);

  const handleMouseOut = useCallback(
    (event, d) => {
      tip.hide(event, d);
      d3.select(event.currentTarget)
        .transition(() => t)
        .attr("fill", (d) => setCircleColor(d, chartType));
    },
    [chartType]
  );

  const drawGraph = useCallback(
    (svg) => {
      const coinList = Object.values(coinData);
      if (!coinList || coinList.length === 0) {
        return;
      }

      const ticked = () => {
        circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      };
      const simulation = createSimulation(chartType, circleType, viewType);
      const circles = createCircles(svg, coinList, circleType);

      circles
        .attr("opacity", 0.85)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .call(tip);

      colorByChartType(circles, chartType);
      simulation.nodes(coinList).on("tick", ticked);
    },
    [chartType, circleType, coinData, handleMouseOut, handleMouseOver, viewType]
  );

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    if (coinData) {
      drawGraph(svg);
    }
  }, [chartType, coinData, drawGraph, svgRef, viewType, circleType]);
};

export default useBubbleChart;
