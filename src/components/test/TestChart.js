import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, BarController, BarElement, CategoryScale, ChartDataLabels);

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem auto;
`;

const ChartDiv = styled.div`
  width: 45rem;
  height: 30rem;
  background-color: #ffffff;
  border-radius: 1rem;
`;

const ListContainer = styled.ul`
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;


const TestChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState([]);
  
  const { loginRes } = useSelector(({ auth }) => ({
    form: auth.login, // 상태 값 설정
    loginRes: auth.loginRes,
    loginErr: auth.loginErr,
  }));
  const accessToken = loginRes.accessToken;

  useEffect(() => {
    // Fetch data from the database or API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://correcting-env.eba-harr53pi.ap-northeast-2.elasticbeanstalk.com/api/v1/tests', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        setData(data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
  
    fetchData();
  },);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        // Remove the existing chart instance if it exists
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const chart = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: props.data.map((data) => data.label),
          datasets: [
            {
              label: '',
              data: props.data.map((data) => data.value),
              backgroundColor: [
                '#2EC4B6',
                '#0A9396',
                '#023047',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
              borderRadius: 10, // Add the borderRadius property for rounded bars
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              color: 'white',
              font: {
                weight: 'bold',
                size: 14,
              },
              anchor: 'end',
              align: 'end',
              formatter: (value, context) => {
                return (value * 100).toFixed(2) + '%';
              },
            },
          },
          scales: {
            x: {
              type: 'category',
              grid: {
                display: false,
              },
            },
            y: {
              type: 'linear',
              grid: {
                display: true,
                color: '#ebedf0',
              },
              ticks: {
                callback: (value) => {
                  return (value * 100).toFixed(0) + '%';
                },
              },
            },
          },
        },
      });

      chartInstanceRef.current = chart; // Save the chart instance
    }
  }, [props.data]);

  return (
    <ChartContainer>
      <ChartDiv>
      <canvas ref={chartRef}></canvas>

      </ChartDiv>
    <ListContainer>
    <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>틀린 문제 보기</h2>
          {data.map((dataItem) => (
            <ListItem key={dataItem.id}>
              <strong>Question: </strong>
              <div dangerouslySetInnerHTML={{ __html: dataItem.question }} />
              <br />
              <strong>Answer: </strong>
              {dataItem.answer}
            </ListItem>
          ))}
    </ListContainer>
    </ChartContainer>
  );
};

export default TestChart;
