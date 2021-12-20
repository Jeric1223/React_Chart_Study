import React, { useRef, useEffect } from "react";

import { heatmapDATA } from "../../data/data";
import * as d3 from "d3";

const HeatMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 450 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 500)
      .append("g")
      .attr("transform", `translate(${60},${50})`);

    // Labels of row and columns
    var myGroups = heatmapDATA.data.dimensions;
    var myVars = heatmapDATA.index;

    // Build X scales and axis:
    var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Build X scales and axis:
    var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
    svg.append("g").call(d3.axisLeft(y));

    // Build color scale
    var myColor = d3.scaleLinear().range(["white", "#69b3a2"]).domain([1, 100]);

    // add the squares
    svg
      .selectAll()
      .data(heatmapDATA.data.measures)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(
          d[0].map((value, index) => {
            console.log(value);
            return value;
          })
        );
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return myColor(d.value);
      });
  }, []);

  return (
    <div>
      <div id="my_dataviz"></div>
      <button
        style={{ width: "100px", height: "100px" }}
        onClick={() => {
          console.log(heatmapDATA);
        }}
      />
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default HeatMap;
