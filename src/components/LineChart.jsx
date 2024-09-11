/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Heading, Spinner, Text, useBreakpointValue } from '@chakra-ui/react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { fetchCoinHistory } from '../services/fetchapi';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChart = ({ coinId, timePeriod }) => {
  const [coinHistory, setCoinHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoinHistory = async () => {
      setLoading(true);
      try {
        const history = await fetchCoinHistory(coinId, timePeriod);
        setCoinHistory(history);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCoinHistory();
  }, [coinId, timePeriod]); // Refetch data only when coinId or timePeriod changes

  // Determine the number of labels to show based on screen size
  const maxTicksLimit = useBreakpointValue({
    base: 5, sm: 7, md: 10, lg: 15, xl: 20,
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!coinHistory || !coinHistory.prices || coinHistory.prices.length === 0) {
    return <Text>No data available for this time period.</Text>;
  }

  // Prepare chart data
  const chartData = {
    labels: coinHistory.prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: `Price (USD) - Last ${timePeriod} days`,
        data: coinHistory.prices.map((price) => price[1]),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { autoSkip: true, maxTicksLimit },
      },
      y: {
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Price: $${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <Box mb="10" height={['300px', '500px', '600px']} width="100%">
      <Heading as="h3" size="md" mb="5">Price History</Heading>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default LineChart;
