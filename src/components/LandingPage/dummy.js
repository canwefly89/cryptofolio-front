import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import { tip as d3tip } from "d3-v6-tip";
import "./graph.css";
import actionCreator from "../../actions/actionCreator";
import CoinList from "../CreateCryptoFolio/CreateCryptoFolio";

const width = 1200;
const height = 1000;

const H1 = styled.h1`
  color: blue;
`;

const LandingPage = memo((props) => {
  const dispatch = useDispatch();
  const { coinData } = useSelector((state) => state.coinReducer);
  const [marketCaps, setMarketCaps] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [exchangeBase, setExchangeBase] = useState([]);
  const svgRef = useRef();

  const color = d3.scaleOrdinal(["#dfe6e9", "#f6e58d", "#f9ca24"]);
  const t = d3.transition().duration(500);

  const tip = d3tip()
    .attr("class", "tip card")
    .style("left", "0px")
    .style("top", "0px")
    .html((event, d) => {
      return `<div>
      <img src=${d?.imagePath}></img>
      </div>`;
    });

  const handleMouseOver = (event, d) => {
    tip.show(event, d);
    d3.select(event.currentTarget)
      .transition(() => t)
      .attr("fill", "red");
  };

  const handleMouseOut = (event, d) => {
    tip.hide(event, d);
    d3.select(event.currentTarget)
      .transition(() => t)
      .attr("fill", color(d.depth));
  };

  const makeCategoryBase = () => {};

  const makeMarketCapForce = (svg) => {
    const newExchangeBase = Object.values(coinData);
    if (newExchangeBase.length === 0) return;

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
      .data(newExchangeBase)
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

    simulation.nodes(newExchangeBase).on("tick", ticked);
    // .attr("transform", (d) => `translate(${d.x + 100}, ${d.y + 100})`);
  };

  const makeMarketCapBase = (svg) => {
    const handledData = { ...coinData };

    if (!handledData) return;

    Object.values(handledData).forEach((coin) => {
      if (coin.exchanges?.length === 2) {
        handledData[coin.ticker].parent = "both";
      } else if (coin.exchanges?.includes("binance")) {
        handledData[coin.ticker].parent = "binance";
      } else {
        handledData[coin.ticker].parent = "upbit";
      }
    });

    const newExchangeBase = [
      { name: "exchange", parent: "" },
      { name: "both", parent: "exchange" },
      { name: "upbit", parent: "exchange" },
      { name: "binance", parent: "exchange" },
      ...Object.values(handledData),
    ];

    setExchangeBase(newExchangeBase);

    const stratify = d3
      .stratify()
      .id((d) => d.name)
      .parentId((d) => d.parent);

    const rootNode = stratify(newExchangeBase).sum((d) =>
      d.marketCap?.marketCap / 10000000 < 50
        ? 50
        : d.marketCap?.marketCap / 10000000
    );

    const pack = d3
      .pack()
      .size([width - 200, width - 200])
      .padding(5);

    const bubbleData = pack(rootNode).descendants();

    // join data and add group for each node
    const nodes = svg
      .selectAll("g")
      .data(bubbleData)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x + 100}, ${d.y + 100})`);
    // .on("mouseover", (...args) => {
    //   console.log(args);
    //   // handleMouseOver()
    // });
    svg.call(tip);

    nodes
      .append("circle")
      .attr("r", 0)
      .transition(t)
      // .duration(500)
      .attr("r", (d) => d.r)
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("fill", (d) => color(d.depth));

    nodes
      .filter((d) => d.depth < 2)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.r + 50)
      .attr("fill", "blue")
      .style("font-size", "50px")
      .text((d) => d.id);

    nodes
      .filter((d) => !d.chlidren)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "#2f3640")
      .style("font-size", (d) => {
        return d.value / 400 < 10 ? 10 : d.value / 400;
      })
      .text((d) => d.data.ticker);
    // .on("mouseover", handleMouseOver)
    // .on("mouseout", handleMouseOut);

    nodes
      .selectAll("circle")
      .filter((d) => !d.children)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  };

  const makePriceBase = () => {};
  const makeExchangeBase = () => {};

  const pack = (size) => {
    return d3.pack().size(size).padding(5);
  };

  const makeHierarchy = (data) => {
    return d3
      .hierarchy({ children: data })
      .sum((d) =>
        d.marketCap?.marketCap / 10000000 < 70
          ? 70
          : d.marketCap?.marketCap / 10000000
      );
  };

  const createSVG = () => {
    return d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("style", "border: thin red solid");
  };

  const drawChart = useCallback(
    (svg, data) => {
      const hierarchalData = makeHierarchy(
        coinList.sort((a, b) => b.marketCap?.marketCap - a.marketCap?.marketCap)
      );
      const packLayout = pack([width - 200, height - 200]);

      const root = packLayout(hierarchalData);
      const leaf = svg.selectAll("g").data(root.leaves()).join("g");
      const circles = leaf.selectAll("circle");

      const t = d3.transition().duration(500);

      // circles.exit().remove();

      // circles
      //   .attr("fill", "orange")
      //   .attr("r", 20)
      //   // .attr("transform", (d) => `translate(200, ${d.y})`)
      //   .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      //   .transition(t)
      //   .attr("r", (d) => d.r)
      //   .attr("fill-opacity", 0.7)
      //   .attr("fill", "navy");

      leaf
        .append("circle")
        .attr("r", 0)
        // .attr("transform", (d) => `translate(200, ${d.y})`)
        .attr("transform", (d) => `translate(${d.x + 100}, ${d.y + 100})`)
        .transition()
        .duration(500)
        .attr("r", (d) => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", "pink");
    },
    [coinList]
  );

  useEffect(() => {
    const svg = createSVG();
    // makeMarketCapBase(svg);
    makeMarketCapForce(svg);
    // drawChart(svg, marketCaps);
    // const filtered = [];

    // console.log(Math.max(...marketCaps));
    // console.log(Math.min(...marketCaps));

    // if (coinData && marketCaps.length === 0) {
    //   Object.values(coinData).forEach((coin) => {
    //     filtered.push(coin.marketCap.marketCap);
    //   });

    //   setCoinList(Object.values(coinData));
    //   setMarketCaps(filtered);
    // }

    // if (coinList.length > 0 && marketCaps.length > 0) {
    //   const svg = createSVG();
    //   // makeMarketCapBase(svg);
    //   makeMarketCapForce(svg);
    //   // drawChart(svg, marketCaps);
    // }
  }, [coinData, coinList, drawChart, marketCaps]);

  return (
    <div>
      <div>LandingPage</div>
      <svg ref={svgRef}></svg>
    </div>
  );
});

export default LandingPage;
