import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaClipboardList, FaChartLine } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [stats, setStats] = useState([]);
  const [topMajors, setTopMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [chartData, setChartData] = useState({
    categories: [],
    assessmentData: [],
    userData: []
  });

  const [chartOptions, setChartOptions] = useState({
    xaxis: {
      show: true,
      categories: [],
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
          return Math.round(value);
        }
      }
    },
    series: [
      {
        name: "New Students",
        data: [],
        color: "#1A56DB",
      },
      {
        name: "Assessments Completed",
        data: [],
        color: "#16A34A",
      }
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
        gradientToColors: ["#1C64F2", "#16A34A"],
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

  const [pieChartOptions, setPieChartOptions] = useState({
    chart: {
      type: 'pie',
      height: 350
    },
    labels: [],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    colors: ['#1A56DB', '#7E3BF2', '#16A34A', '#DC2626', '#F59E0B']
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard data...');
      
      const response = await axios.get('http://localhost/EDU-PILOT/backend/get_student_stats.php', {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Raw response:', response);
      
      if (response.data.success) {
        const { stats, trends, topMajors } = response.data.data;
        console.log('Parsed data:', { stats, trends, topMajors });
        
        // Convert stats object to array if it's not already
        const statsArray = Array.isArray(stats) ? stats : [
          {
            title: 'Total Students',
            value: stats.total_students || 0,
            trend: 'up',
            change: '+10%',
            icon: 'users'
          },
          {
            title: 'Total Assessments',
            value: stats.total_assessments || 0,
            trend: 'up',
            change: '+5%',
            icon: 'clipboard-list'
          },
          {
            title: 'Recent Assessments',
            value: stats.recent_assessments || 0,
            trend: 'up',
            change: 'Last 30 days',
            icon: 'chart-line'
          }
        ];
        
        setStats(statsArray);
        setTopMajors(topMajors);
        
        const timeRangeData = trends[timeRange] || [];
        console.log('Time range data:', timeRangeData);
        
        const categories = timeRangeData.map(item => item.date);
        const userData = timeRangeData.map(item => parseInt(item.student_count || 0));
        const assessmentData = timeRangeData.map(item => parseInt(item.assessment_count || 0));

        setChartData({
          categories,
          userData,
          assessmentData
        });

        setChartOptions(prev => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories
          },
          series: [
            {
              name: "New Students",
              data: userData,
              color: "#1A56DB",
            },
            {
              name: "Assessments Completed",
              data: assessmentData,
              color: "#16A34A",
            }
          ]
        }));

        setPieChartOptions(prev => ({
          ...prev,
          labels: topMajors.map(major => major.Major_Name)
        }));
      } else {
        console.error('Server returned error:', response.data);
        throw new Error(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        stack: error.stack
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setIsDropdownOpen(false);
  };

  const getTimeRangeLabel = (range) => {
    switch (range) {
      case '7days':
        return 'Last 7 Days';
      case '30days':
        return 'Last 30 Days';
      case '6months':
        return 'Last 6 Months';
      case '12months':
        return 'Last 12 Months';
      default:
        return 'Select Range';
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#0E1C36]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="mb-2 sm:mb-0">
              <h5 className="leading-none text-xl md:text-3xl font-bold text-gray-900 dark:text-white pb-1">
                {stats[0]?.value || 0}
              </h5>
              <p className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                Total Students {getTimeRangeLabel(timeRange)}
              </p>
            </div>
            <div className="flex items-center text-sm md:text-base font-semibold text-green-500 dark:text-green-500">
              {stats[0]?.change || '0%'}
              <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
              </svg>
            </div>
          </div>
          
          <div id="area-chart" className="px-1 md:px-2.5">
            <ReactApexChart 
              options={chartOptions} 
              series={chartOptions.series} 
              type="area" 
              height={300} 
            />
          </div>
          
          <div className="flex justify-between items-center border-gray-200 border-t dark:border-gray-700 pt-4 mt-4">
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {getTimeRangeLabel(timeRange)}
                <svg className="w-2.5 m-1.5 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {['7days', '30days', '6months', '12months'].map((range) => (
                      <li key={range}>
                        <button
                          className={`block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${timeRange === range ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                          onClick={() => handleTimeRangeChange(range)}
                        >
                          {getTimeRangeLabel(range)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Recommended Majors</h3>
          <div id="pie-chart">
            <ReactApexChart 
              options={pieChartOptions}
              series={topMajors.map(major => major.count)}
              type="pie"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;