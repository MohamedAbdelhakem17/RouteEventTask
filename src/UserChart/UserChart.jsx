import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import useGetData from '../context/DataProvider/DataContext';

export default function UserChart() {
    const { customerId } = useParams();
    const { data: userData } = useGetData()
    const [userName, setUserName] = useState("")
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        if (customerId && userData.length > 0) {
            const customer = userData.find(customer => customer.id === +customerId);
            if (customer) {
                setUserName(customer.name);
                const { transactions } = userData.find(user => user.id === +customerId)
                setTransactions(transactions)
            }
        }
    }, [customerId, userData]);

    const data = {
        labels: transactions.map(item => item.date),
        datasets: [{
            label: userName,
            data: transactions.map(item => item.amount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            borderRadius: 10,
            categoryPercentage: 0.3,
            hoverOffset: 4,
            hoverBackgroundColor: true,
        }]
    };


    const options = {

        plugins: {

            legend: {
                labels: {
                    font: {
                        size: 24
                    }
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
                ticks: {
                    font: {
                        size: 15,
                        weight: "bolder"
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
                max: Math.max(...transactions.map(item => item.amount)) + 500,
                title: {
                    display: true,
                    text: 'Amount',
                    font: {
                        size: 20
                    }
                }
            }
        }
    };


    return (
        <>
            <div className='w-100 vh-100 d-flex align-items-center justify-content-center px-2'>
                <div className="bg-light col-12 col-md-8 col-lg-6 h-75 p-md-5 rounded shadow-lg  d-flex align-items-center justify-content-center">
                    <Bar data={data} options={options} />
                </div>
            </div>

        </>
    );
}
