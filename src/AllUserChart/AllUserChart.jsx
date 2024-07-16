import React from 'react'
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import useGetData from '../context/DataProvider/DataContext'

export default function AllUserChart() {
  const { data: userData } = useGetData()

  const x = userData.map(user => ({
    label: user.name,
    data: user.transactions.map(item => item.amount),
  }));

  const labels = userData.map(user => (
    user.transactions.map(item => item.date)
  )).flat();

  const data = {
    labels: [...new Set(labels)],
    datasets: [...x]
  };



  const options = {

    plugins: {

      legend: {
        labels: {
          font: {
            size: 14
          },
          padding: 25
        }
      },

      tooltip: {
        titleFont: {
          size: 17
        },
        bodyFont: {
          size: 15
        }
      }
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
            weight: "bold"
          }
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 20
          }
        }
      },
      y: {
        beginAtZero: true,
        max: Math.max(...userData.flatMap(user => user.transactions.map(item => item.amount))) + 50,
        title: {
          display: true,
          text: 'Amount',
          font: {
            size: 20
          }
        }
      }
    },
  };



  return (
    <>
      <div className='w-100 vh-100 d-flex align-items-center justify-content-center px-2'>
        <div className="bg-light col-12 col-md-8 col-lg-6 h-75 p-md-5 rounded shadow-lg  d-flex align-items-center justify-content-center">
          <Line data={data} options={options} />
        </div>
      </div>

    </>
  );
}
