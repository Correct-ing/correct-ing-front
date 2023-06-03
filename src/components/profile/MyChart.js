import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';

// SCORE DIV
const ChartDiv = styled.div`
  width: 17rem;
  height: 17rem;
  justify-content: center;
  border-radius: 1rem;
  background: #ffffff;
`;

const MyChart = (props) => {

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels: props.data.map((data) => data.label),
    datasets: [
      {
        data: props.data.map((data) => data.value),
        backgroundColor: [
          '#6AC7B2',
          '#040C0A',
          '#C0E8DF',
          '#41AC94',
          '#37947F',
          '#0E241F',
          '#9BDACC',
          '#51BEA5',
          '#1C493F'
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

  const options = {
    plugins: {
      datalabels: {
        display: false, // Set display to false to hide the labels
      },
    },
  };

  return (
    <ChartDiv>
      <Pie data={data} options={options}/>
    </ChartDiv>
  )

}

export default MyChart;

