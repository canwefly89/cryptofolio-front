import { useEffect } from "react";
import * as d3 from "d3";

/**
 *
 * @param {String, array, object}
 *
 */

const usePieChart = (svgRef, selectedList, coinData) => {
  useEffect(() => {
    const dims = { height: 400, width: 400, radius: 200 };
    const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", dims.width + 10)
      .attr("height", dims.height + 10)
      .attr("style", "border: thin red solid");

    svg.selectAll("g").remove();

    const graph = svg
      .append("g")
      .attr("transform", `translate(${cent.x}, ${cent.y})`);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.amount * coinData[d.name].price.price);

    const arcPath = d3
      .arc()
      .outerRadius(dims.radius)
      .innerRadius(dims.radius / 2);

    const color = d3.scaleOrdinal(d3["schemeSet3"]);

    const arcTweenEnter = (d) => {
      const i = d3.interpolate(d.endAngle, d.startAngle);

      return function (ticker) {
        d.startAngle = i(ticker);
        return arcPath(d);
      };
    };

    const update = (data) => {
      if (data.length === 0) return;

      color.domain(data.map((d) => d.name));

      const paths = graph.selectAll("path").data(pie(data));

      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("d", arcPath)
        .attr("fill", "blue")
        .attr("stroke", "#c8d6e5")
        .attr("fill", (d) => color(d.data.name))
        .transition()
        .duration(300)
        .attrTween("d", arcTweenEnter);
    };

    update(selectedList);
  }, [coinData, selectedList, svgRef]);
};

export default usePieChart;
