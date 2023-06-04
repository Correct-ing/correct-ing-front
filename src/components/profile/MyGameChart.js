import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const MyGameChart = (props) => {
  if (!props.data || props.data.length === 0) {
    // 데이터가 없는 경우에 대한 처리
    return <div>No data available</div>;
  }
  //이름 중복되면 가장 높은 스코어 가진 값만 표시
  const scoreMap = new Map();
  props.data.forEach((item) => {
    const { name, score } = item;
    if (!scoreMap.has(name) || score > scoreMap.get(name)) {
      scoreMap.set(name, score);
    }
  });

  // 그룹화된 이름과 점수를 배열로 변환
  const groupedNames = Array.from(scoreMap.keys());
  const groupedScores = Array.from(scoreMap.values());
  // 데이터 배열에서 name과 score를 분리합니다.
  const names = props.data.map((item) => item.name);

  const emphasizedNickname = localStorage.getItem('id');

  const backgroundColors = names.map((name) =>
    name === emphasizedNickname ? '#2EC4B6' : '#CAE7E2',
  );

  // 막대 그래프에 사용할 데이터 설정
  const chartData = {
    labels: groupedNames,
    datasets: [
      {
        data: groupedScores,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0,
      },
    ],
  };
  //console.log(chartData);
  // 막대 그래프 옵션 설정
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#243465', // Set the font color for the scores
      },
      font: {
        weight: 'bold', // Set the font weight to bold
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={chartOptions} />
    </>
  );
};

export default MyGameChart;
