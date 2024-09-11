/* eslint-disable react/prop-types */

import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Skeleton } from '@chakra-ui/react';
import millify from 'millify';
import { useEffect, useState } from 'react';

const GlobalCryptoStats = ({ globalStats }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (globalStats) {
      setLoading(false); // Set loading to false when stats are fetched
    }
  }, [globalStats]);

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={6}>Global Crypto Stats</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <StatCard title="Total Cryptocurrencies" value={globalStats.total} loading={loading} />
        <StatCard title="Total Exchanges" value={globalStats.totalExchanges ? millify(globalStats.totalExchanges) : ''} loading={loading} />
        <StatCard title="Total Market Cap" value={globalStats.totalMarketCap ? `$${millify(globalStats.totalMarketCap)}` : ''} loading={loading} />
        <StatCard title="Total 24h Volume" value={globalStats.total24hVolume ? `$${millify(globalStats.total24hVolume)}` : ''} loading={loading} />
        <StatCard title="Total Markets" value={globalStats.totalMarkets ? millify(globalStats.totalMarkets) : ''} loading={loading} />
      </SimpleGrid>
    </Box>
  );
};

const StatCard = ({ title, value, loading }) => (
  <Stat p={4} shadow="md" borderWidth="1px" borderRadius="lg">
    <StatLabel>{title}</StatLabel>
    <StatNumber>
      <Skeleton isLoaded={!loading}>
        {value}
      </Skeleton>
    </StatNumber>
  </Stat>
);

export default GlobalCryptoStats;
