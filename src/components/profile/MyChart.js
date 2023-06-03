import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';

// SCORE DIV
const ChartDiv = styled.div`
  margin: -1.5rem auto;
  width: 16rem;
  height: 16rem;
  justify-content: center;
  background-color: black;
  border-radius: 1rem;
  background: #ffffff;
`;

const MyChart = (props) => {

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels: '',
    datasets: [
      {
        data: props.data.map((data) => data.value),
        backgroundColor: [
          '#2EC4B6',
          '#0A9396',
          '#023047',
          '#011627'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 0,
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 20,
          },
          anchor: '1rem',
          align: '3rem',
          formatter: (value, context) => {
            return value.toFixed(1) + "%";
          },
        },
      },
    ],
  };

  return (
    <ChartDiv>
      <Pie data={data} />
    </ChartDiv>
  )

}

export default MyChart;

