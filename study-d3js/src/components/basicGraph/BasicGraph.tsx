import React, { useState, useEffect, useRef } from "react";
import { select } from "d3";
import * as S from "./style";

const BasicGraph = () => {
  const [data, setData] = useState([24, 30, 45, 70, 26, 24, 30, 45, 70, 26]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current); // selection 객체

    svg
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("width", "10")
      .attr("height", (value) => value * 10)
      .attr("x", (value, id) => 50 * id)
      .attr("y", (value) => 500 - value * 10)
      .attr("background-color", "red")
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg style={{ width: "500px", height: "500px" }} ref={svgRef}></svg>
    </>
  );
};

export default BasicGraph;
