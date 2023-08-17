import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as chartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement, 
  Title,
  Tooltip,
  Legend,
 
} from "chart.js";

chartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, day }) => {

  const date = ["12/12/22", "23/12/23", "32/2/33"];

  const prices = [1, 2, 34];

  return (
    <>
      <Line
        options={{ responsive: true }}
        data={{
          labels: date,
          datasets: [
            { label: `Price in ${currency}`,
            date : prices, borderColor:"rgb(255,99,132)",
            backgroundColor: "rgb(255,99,132,0.5)"
          
          }],
         

        }}
      />
    </>
  );
};
export default Chart;
