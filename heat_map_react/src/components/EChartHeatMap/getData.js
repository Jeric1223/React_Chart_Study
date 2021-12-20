import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const requestChartData = () =>
  new Promise((resolve) => {
    axios({
      url: "/dashboard/cohort",
      method: "get",
      baseURL: BASE_URL,
      params: {
        uuid: API_KEY,
        start_date_id: "2020-01-01",
        end_date_id: "2021-02-28",
        freq: "months",
        measures: "retention",
      },
    }).then((res) => {
      resolve({
        data: res.data,
      });
    });
  });
