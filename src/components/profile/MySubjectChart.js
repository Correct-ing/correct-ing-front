import React from 'react';
import styled, { css } from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';


const sizes = {
    phone: 768,
    tablet: 1000
  };
  
  // 자동으로 media 쿼리 함수를 만들어 준다.
  const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
      }
    `;
    return acc;
  }, {});

// CHART DIV
const ChartDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  text-align: center;
  background-color: black;
  background: #ffffff;
  margin-left: 2.5rem;
  ${media.tablet`margin-left: 0rem;`};
  margin-top: 2rem;

  h1{
    margin: 1rem auto;
  }

  h2{
    margin: 1rem auto;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

const MySubjectChart = (props) => {

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels: '',
    datasets: [
      {
        data: props.data.map((data) => data.value),
        backgroundColor: props.data.map((data, index) => index === 0 ? '#2EC4B6' : 'gray'),
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
            size: 14,
          },
          anchor: '1rem',
          align: '5rem',
          formatter: (value, context) => {
            return "";
          },
        },
        plugins: {
            doughnutcenter: {
              text: props.data.reduce((total, data) => total + data.value, 0) + '%',
              color: 'black',
              font: {
                size: '20',
                weight: 'bold',
              },
            },
          },
      },
    ],
  };

  return (
    <ChartDiv>
      <Doughnut data={data}/>
      <h1>{props.data.map((data) => data.label)}</h1>
      <h2>분석 보기</h2>
    </ChartDiv>
  )

}

export default MySubjectChart;

