import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('7months');
    const stats = [
        { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
        { title: 'In Progress', value: '45', change: '+5%', trend: 'up' },
        { title: 'Completed Assessments', value: '789', change: '+8%', trend: 'up' },
        { title: 'Average Score', value: '85%', change: '+2%', trend: 'up' },
    ];

    const [chartOptions, setChartOptions] = useState({
        xaxis: {
            show: true,
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value) {
                    return value;
                }
            }
        },
        series: [
            {
                name: "Assessments Taken",
                data: [320, 410, 380, 450, 520, 490, 550],
                color: "#1A56DB",
            },
            {
                name: "New Users",
                data: [120, 150, 180, 210, 240, 220, 250],
                color: "#7E3BF2",
            },
        ],
        chart: {
            sparkline: {
                enabled: false
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            markers: {
                width: 8,
                height: 8,
                radius: 12,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
            }
        },
        grid: {
            show: true,
            borderColor: '#F1F1F1',
            strokeDashArray: 3,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },   
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    height: 300
                },
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center'
                }
            }
        }]
    });

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        
        // Update chart data based on selected range
        let newCategories, newAssessmentData, newUserData, totalAssessments;
        
        switch(range) {
            case '7days':
                newCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                newAssessmentData = [120, 190, 150, 210, 180, 90, 60];
                newUserData = [50, 70, 60, 80, 70, 40, 30];
                totalAssessments = '820';
                break;
            case '30days':
                newCategories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                newAssessmentData = [850, 920, 780, 950];
                newUserData = [300, 350, 320, 380];
                totalAssessments = '3,500';
                break;
            case '6months':
                newCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                newAssessmentData = [1200, 1500, 1350, 1600, 1450, 1700];
                newUserData = [500, 600, 550, 650, 600, 700];
                totalAssessments = '8,800';
                break;
            case '12months':
                newCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
                newAssessmentData = [3200, 4100, 3800, 4500];
                newUserData = [1200, 1500, 1800, 2100];
                totalAssessments = '15,600';
        }
        
        setChartOptions(prev => ({
            ...prev,
            xaxis: {
                ...prev.xaxis,
                categories: newCategories
            },
            series: [
                {
                    ...prev.series[0],
                    data: newAssessmentData
                },
                {
                    ...prev.series[1],
                    data: newUserData
                }
            ]
        }));
    };

    const getTotalAssessments = () => {
        switch(timeRange) {
            case '7days': return '820';
            case '30days': return '3,500';
            case '6months': return '8,800';
            case '12months': return '15,600';
            default: return '3,500';
        }
    };

    return (
        <div className="p-4 md:p-6 text-[#0E1C36]">
            <h1 className="text-xl md:text-2xl dark:text-white font-bold mb-4 md:mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
                        <h3 className="text-[#0E1C36]/70 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                        <div className="flex items-baseline mt-1 md:mt-2">
                            <p className="text-xl md:text-2xl font-semibold dark:text-white">{stat.value}</p>
                            <span className={`ml-2 text-xs md:text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                        <h5 className="leading-none text-xl md:text-3xl font-bold text-gray-900 dark:text-white pb-1">{getTotalAssessments()}</h5>
                        <p className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                            Total Assessments {timeRange === '7days' ? 'This Week' : 
                                            timeRange === '30days' ? 'This Month' : 
                                            timeRange === '6months' ? 'Last 6 Months' : 
                                            timeRange === '12months' ? 'This Year' : 'This Month'}
                        </p>
                    </div>
                    <div className="flex items-center text-sm md:text-base font-semibold text-green-500 dark:text-green-500">
                        23%
                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                        </svg>
                    </div>
                </div>
                
                <div id="labels-chart" className="px-1 md:px-2.5">
                    <ReactApexChart 
                        options={chartOptions} 
                        series={chartOptions.series} 
                        type="area" 
                        height={300} 
                    />
                </div>
                
                <div className="flex justify-between items-center border-gray-200 border-t dark:border-gray-700 pt-4 mt-4">
                    <div className="relative">
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                document.getElementById('dropdown').classList.toggle('hidden');
                            }}
                        >
                            {timeRange === '7days' ? 'Last 7 Days' : 
                             timeRange === '30days' ? 'Last 30 Days' : 
                             timeRange === '6months' ? 'Last 6 Months' : 
                             timeRange === '12months' ? 'Last 12 Months' : 'Last 30 Days'}
                            <svg className="w-2.5 m-1.5 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div id="dropdown" className="hidden z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" 
                                       className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${timeRange === '7days' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleTimeRangeChange('7days');
                                           document.getElementById('dropdown').classList.add('hidden');
                                       }}
                                    >
                                        Last 7 Days
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                       className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${timeRange === '30days' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleTimeRangeChange('30days');
                                           document.getElementById('dropdown').classList.add('hidden');
                                       }}
                                    >
                                        Last 30 Days
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                       className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${timeRange === '6months' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleTimeRangeChange('6months');
                                           document.getElementById('dropdown').classList.add('hidden');
                                       }}
                                    >
                                        Last 6 Months
                                    </a>
                                </li>
                                <li>
                                    <a href="#" 
                                       className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${timeRange === '12months' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           handleTimeRangeChange('12months');
                                           document.getElementById('dropdown').classList.add('hidden');
                                       }}
                                    >
                                        Last 12 Months
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;