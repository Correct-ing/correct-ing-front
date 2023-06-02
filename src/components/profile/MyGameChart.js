import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const MyGameChart = (props) => {
  if (!props.data || props.data.length === 0) {
    // 데이터가 없는 경우에 대한 처리
    return <div>No data available</div>;
  }

  // 데이터 배열에서 name과 score를 분리합니다.
  const names = props.data.map((item) => item.name);
  const scores = props.data.map((item) => item.score);

  const emphasizedNickname = 'minpyo';

  const backgroundColors = names.map((name) =>
    name === emphasizedNickname ? '#2EC4B6' : 'gray'
  );

  // 막대 그래프에 사용할 데이터 설정
  const chartData = {
    labels: names,
    datasets: [
      {
        label: 'Test Score',
        data: scores,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0,
      },
    ],
  };

  // 막대 그래프 옵션 설정
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        color: '#243465', // Set the font color for the scores
      },
      font: {
        weight: 'bold', // Set the font weight to bold
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default MyGameChart;
