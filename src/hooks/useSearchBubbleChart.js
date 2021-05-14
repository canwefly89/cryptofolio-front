import * as d3 from "d3";
import { COLORS } from "../constants/constants";
import setCircleColor from "../utils/setCircleColor";

/**
 *
 * @param {String} message
 * @returns error message & show message func
 */
const useSearchBubbleChart = (svgRef, searchTerm, type) => {
  const handleSearch = (event) => {
    event.preventDefault();

    const circles = d3.select(svgRef.current).selectAll("circle");

    circles
      .filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .attr("fill", COLORS.SEARCH_TARGET);

    circles
      .filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .attr("fill", COLORS.SEARCH_TARGET);

    circles
      .filter(
        (d) =>
          !d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !d.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .attr("fill", (d) => setCircleColor(d, type));
  };

  return handleSearch;
};

export default useSearchBubbleChart;
