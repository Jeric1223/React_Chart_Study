import React, { useEffect, useState } from "react";
import { requestChartData } from "./getData";
import ReactECharts from "echarts-for-react";
import BarLoader from "react-spinners/BarLoader";
import styled from "styled-components";

const EChartHeatMap = () => {
  const [isData, setIsData] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [echartOption, setEChartOption] = useState({});

  //api 요청하여 데이터 저장하기
  useEffect(() => {
    requestChartData()
      .then((res) => {
        console.log(res);
        setApiData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // api 데이터가 있는지 확인하는 함수 (Loading 체크)
  const dataStateManage = () => {
    if (apiData.length !== 0) {
      setIsData(true);
    }
  };

  //dataStateManage apiData의 상태가 바뀌면 함수를 실행시켜주는 useEffect
  useEffect(dataStateManage, [apiData]);

  //isData == true, 데이터가 있다면 그래프를 그리는 함수를 실행
  useEffect(() => {
    if (isData) {
      const hours = apiData.data.dimensions;
      // prettier-ignore
      const days = apiData.index;

      const data = apiData.data.measures[0]
        .map((value, index) => {
          return value.map((item, child_index) => {
            return [index, child_index, item];
          });
        })
        .flat()
        .map(function (item) {
          return [item[1], item[0], item[2] || "-"];
        });

      setEChartOption({
        tooltip: {
          position: "top",
          formatter: function (params) {
            return `Data value<br />
            ${apiData.measures[0]}: ${params.data[2]}%<br />
            ${apiData.measures[1]}: ${apiData.data.measures[1][params.data[1]][
              params.data[0]
            ]
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            `;
          },
        },
        grid: {
          height: "85%",
          top: "10%",
          show: true,
        },
        xAxis: {
          type: "category",
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: days,
          inverse: true,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 30,
          inRange: {
            color: ["#ffffff", "#2881b9"], //From smaller to bigger value ->
          },
          calculable: true,
          orient: "horizontal",
          right: "0%",
          top: "10%",
          bottom: "0%",
        },
        series: [
          {
            name: "data value",
            type: "heatmap",
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
  }, [isData]);

  return isData ? (
    //그래프 컴포넌트
    <ReactECharts option={echartOption} style={{ marginTop: "50px" }} />
  ) : (
    //데이터 불러오기 전까지 로딩창 실행
    <BarLoader
      color={"#2881b9"}
      css={`
        position: absolute;
        display: block;
        border-color: red;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
      `}
    />
  );
};

export default EChartHeatMap;
