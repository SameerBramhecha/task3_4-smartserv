import React, { useState, useEffect } from 'react';
import {  Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../App.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState({
        realTimeData: {
            labels: [],
            datasets: [
                {
                    label: 'Real-time Data',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                },
            ],
        },
        companyMetrics: {
            revenue: 50000,
            totalJobs: 100,
            ticketsCreated: 150,
            ticketsSold: 80,
            
        },
        revenueByJobLocation: {
            labels: ['Seattle', 'New York', 'Los Angeles', 'Denver'],
            datasets: [
                {
                    label: 'Revenue by Job Location',
                    data: [15000, 12000, 8000, 20000],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                },
            ],
        },
        revenueByJobType: {
            labels: ['Maintainance', 'Service Plumbing', 'Service HVAC', 'Material Sale'],
            datasets: [
                {
                    label: 'Revenue by Job Type',
                    data: [10000, 15000, 12000, 5000],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                },
            ],
        },
    });

    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const generateRandomData = () => Math.floor(Math.random() * 100);

        if (chartInstance) {
            chartInstance.destroy();
        }

        setChartData((prevData) => ({
            ...prevData,
            realTimeData: {
                ...prevData.realTimeData,
                labels: Array.from({ length: 10 }, (_, index) => index),
                datasets: [
                    {
                        ...prevData.realTimeData.datasets[0],
                        data: Array.from({ length: 10 }, generateRandomData),
                    },
                ],
            },
        }));

        const newChartInstance = new Chart(document.getElementById('realTimeChart'), {
            type: 'line',
            data: chartData.realTimeData,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setChartInstance(newChartInstance);

        const chartDataInterval = setInterval(() => {
            setChartData((prevData) => {
                const newData = {
                    ...prevData,
                    realTimeData: {
                        ...prevData.realTimeData,
                        labels: [...prevData.realTimeData.labels, prevData.realTimeData.labels.length],
                        datasets: [
                            {
                                ...prevData.realTimeData.datasets[0],
                                data: [...prevData.realTimeData.datasets[0].data, generateRandomData()],
                            },
                        ],
                    },
                };

                const maxDataPoints = 10;
                if (newData.realTimeData.labels.length > maxDataPoints) {
                    newData.realTimeData.labels.shift();
                    newData.realTimeData.datasets[0].data.shift();
                }

                return newData;
            });

            
            newChartInstance.update();
        }, 1000);

        return () => {
            clearInterval(chartDataInterval);
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };
    }, [chartData, chartInstance]);

    return (
        <div className="real-time-dashboard-container">
            <h2>Real-time Dashboard</h2>

            <h3>Company Metrics</h3>
            <div className="company-metrics">
                
                    <div className="metric-box">
                        Revenue: ${chartData.companyMetrics.revenue}
                    </div>
                    <div className="metric-box">
                    Total Jobs: {chartData.companyMetrics.totalJobs}
            </div>
                    <div className="metric-box">
            Tickets Created: {chartData.companyMetrics.ticketsCreated}
            </div>
                    <div className="metric-box">
                    Tickets Sold: {chartData.companyMetrics.ticketsSold}
        </div >
            </div>

            <h3>Revenue By Job Location</h3>
            <div className="chart-container">
                <Bar data={chartData.revenueByJobLocation} />
            </div>
            <h3>Revenue By Job Type</h3>
            <div className="chart-container1">
                <Bar data={chartData.revenueByJobType} />
            </div>
        </div>
    );
};

export default Dashboard;
