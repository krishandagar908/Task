import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  ComposedChart,
} from "recharts";

const Charts = () => {
  const [chartData, setChartData] = useState([]);
  const [type, setType] = useState("");

  let url = "http://localhost:3001/chart";

  const uniqueType = useMemo(() => {
    const types = [];
    chartData.forEach((_) => {
      if (!types.includes(_.type)) {
        types.push(_.type);
      }
    });

    return types;
  }, [chartData]);

  const filterData = useMemo(() => {
    let finalData = [];

    let filterType = chartData.filter((_) => _.type == type);
    let obj = {};

    let finalArray = type ? filterType : chartData;
    finalArray.map((item) => {
      if (item.month.trim()) {
        obj[item.month] = (obj[item.month] || 0) + parseInt(item.number);
      }
    });
    for (let key in obj) {
      console.log(obj);
      finalData.push({
        month: key,
        amount: obj[key],
      });
    }
    return finalData;
  }, [type, chartData]);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    fetch(`${url}`)
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        setChartData(data.data);
      });
  };

  return (
    <div>
      <select
        value={type}
        onChange={(e) => {
          console.log(e.target.value);
          setType(e.target.value);
        }}
      >
        <option default value="choose type">
          {"choose type"}
        </option>
        {uniqueType.map((_) => {
          return (
            <option key={_} value={_}>
              {_}
            </option>
          );
        })}
      </select>

      <ComposedChart
        width={700}
        height={400}
        data={filterData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" barSize={20} fill="#413ea0" />
        <Line type="amount" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

export default Charts;
