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

  const ChartBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `

// CHART DIV
const ChartDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  ${media.tablet`margin-left: 0rem;`};
  //margin-top: 1rem;

  h1{
    margin: 1.5rem 0;
    font-size: 1.3rem;
  }

  h2{
    margin: 0.5rem 0;
    font-weight: 600;
    color: #243465;
    font-size: 1.2rem;
  }
`;

const MySubjectChart = (props) => {

  const TopRankList = props.data.sort(function (a, b) {
    return b.value - a.value;
  });

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data1 = {
    labels: '',
    datasets: [
      {
        data: [TopRankList[0].value, 100-(TopRankList[0].value)],
        backgroundColor: [TopRankList[0].color, '#B4ABAB'],
        // backgroundColor: props.data.map((data, index) => index === 0 ? '#2EC4B6' : 'gray'),
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
              text: TopRankList.reduce((total, data) => total + data.value, 0) + '%',
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

//   <GraphInfoWrap>
//   <GraphDivTop>
//     <h1>취약점 분석표</h1>
//       <MyChart data={data}></MyChart>
//       </GraphDivTop>
//       <GraphDivBottom>
//     <h1>집중 분석</h1>
//       <MySubjectChart data={data}/>
// </GraphDivBottom>
// </GraphInfoWrap>

  const data2 = {
    labels: '',
    datasets: [
      {
        data: [TopRankList[1].value, 100-(TopRankList[1].value)],
        backgroundColor: [TopRankList[1].color, '#B4ABAB'],
        // backgroundColor: props.data.map((data, index) => index === 0 ? '#2EC4B6' : 'gray'),
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
              text: TopRankList.reduce((total, data) => total + data.value, 0) + '%',
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

  const data3 = {
    labels: '',
    datasets: [
      {
        data: [TopRankList[2].value, 100-(TopRankList[3].value)],
        backgroundColor: [TopRankList[2].color, '#B4ABAB'],
        // backgroundColor: props.data.map((data, index) => index === 0 ? '#2EC4B6' : 'gray'),
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
              text: TopRankList.reduce((total, data) => total + data.value, 0) + '%',
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
    <ChartBlock>
    <ChartDiv>
      <Doughnut data={data1}/>
      <h1>{(props.data[0].label)}</h1>
      <h2>{(props.data[0].value).toFixed(1)}%</h2>
    </ChartDiv>
    <ChartDiv>
      <Doughnut data={data2}/>
      <h1>{(props.data[1].label)}</h1>
      <h2>{(props.data[1].value).toFixed(1)}%</h2>
    </ChartDiv>    
    <ChartDiv>
      <Doughnut data={data3}/>
      <h1>{(props.data[2].label)}</h1>
      <h2>{(props.data[2].value).toFixed(1)}%</h2>
    </ChartDiv>
    </ChartBlock>
  )
}

export default MySubjectChart;
