import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, BarController, BarElement, CategoryScale, ChartDataLabels);

const ChartDiv = styled.div`
  margin: 2rem auto;
  width: 45rem;
  height: 30rem;
  background-color: #ffffff;
  border-radius: 1rem;
`;

const TestChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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
    <ChartDiv>
      <canvas ref={chartRef}></canvas>
    </ChartDiv>
  );
};

export default TestChart;
