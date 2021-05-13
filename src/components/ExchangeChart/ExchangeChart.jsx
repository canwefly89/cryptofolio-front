import React, { useEffect, useRef, useCallback } from "react";

import { useSelector } from "react-redux";
import * as d3 from "d3";
import { tip as d3tip } from "d3-v6-tip";

const width = 1200;
const height = 1000;
const color = d3.scaleOrdinal(["#dfe6e9", "#f6e58d", "#f9ca24"]);
const t = d3.transition().duration(500);

const ExchangeChart = () => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const svgRef = useRef();

  const tip = d3tip()
    .attr("class", "tip card")
    .style("left", "0px")
    .style("top", "0px")
    .html((event, d) => {
      return `<div>
      <img src=${d?.imagePath}></img>
      </div>`;
    });

  const handleMouseOver = useCallback(
    (event, d) => {
      tip.show(event, d);
      d3.select(event.currentTarget)
        .transition(() => t)
        .attr("fill", "red");
    },
    [tip]
  );

  const handleMouseOut = useCallback(
    (event, d) => {
      tip.hide(event, d);
      d3.select(event.currentTarget)
        .transition(() => t)
        .attr("fill", color(d.depth));
    },
    [tip]
  );

  const makeMarketCapForce = useCallback(
    (svg) => {
      const coinList = Object.values(coinData);
      if (!coinList || coinList.length === 0) return;

      const ticked = () => {
        circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      };

      const radiusScale = d3
        .scaleSqrt()
        .domain([13743669, 1112293591821])
        .range([5, 200]);

      const forceX = d3
        .forceX((d) => {
          if (d.exchanges?.length === 2) return width / 2 - 50;
          if (d.exchanges?.includes("upbit")) return 200;
          if (d.exchanges?.includes("binance")) return width - 300;
        })
        .strength(0.07);

      const forceY = d3
        .forceY((d) => {
          if (d.exchanges?.length === 2) return height / 2 - 50;
          if (d.exchanges?.includes("upbit")) return 200;
          if (d.exchanges?.includes("binance")) return height - 300;
        })
        .strength(0.07);

      const simulation = d3
        .forceSimulation()
        .force("x", forceX)
        .force("y", forceY)
        .force(
          "collide",
          d3.forceCollide((d) => radiusScale(d.marketCap?.marketCap) + 3)
        );

      svg.selectAll("g").remove();

      const fixSvg = svg.append("g").attr("transform", "translate(0,0)");

      const circles = fixSvg
        .selectAll("circle")
        .data(coinList)
        .enter()
        .append("circle")
        .attr("r", (d) => {
          return d.marketCap ? radiusScale(d.marketCap?.marketCap) : 10;
        })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .call(tip);

      circles
        .filter((d) => d.exchanges?.includes("upbit"))
        .attr("fill", "#0a3587");
      circles
        .filter((d) => d.exchanges?.includes("binance"))
        .attr("fill", "#f6cc28");
      circles.filter((d) => d.exchanges?.length === 2).attr("fill", "#ff6b6b");

      simulation.nodes(coinList).on("tick", ticked);
    },
    [coinData, handleMouseOut, handleMouseOver, tip]
  );

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("style", "border: thin red solid");

    if (coinData) {
      makeMarketCapForce(svg);
    }
  }, [coinData, makeMarketCapForce]);
  return (
    <div>
      <div>ExchangeChart</div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ExchangeChart;
