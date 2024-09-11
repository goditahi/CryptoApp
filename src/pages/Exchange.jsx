import { useEffect, useState } from 'react';
import { fetchExchange } from '../services/fetchapi';
import { Box, Spinner, Text, Heading, SimpleGrid, Card, CardBody, Image, Stack, Divider, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import millify from 'millify';
import {  StarIcon, LinkIcon } from '@chakra-ui/icons';

const Exchange = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchExchange();
        setExchangeData(res); // Set the fetched data to state
      } catch (error) {
        setError(error); // Set error if fetching fails
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={5}>
        <Text fontSize="lg" color="red.500">
          There was an error fetching the data. Please try again later.
        </Text>
      </Box>
    );
  }

  if (!exchangeData || exchangeData.length === 0) {
    return <Text>No data available.</Text>;
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>
       Best Exchanges Available
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {exchangeData.map((exchange) => (
          <Card key={exchange.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <CardBody>
              <Stack spacing={4}>
                <Image 
                  src={exchange.image} 
                  alt={`${exchange.name} logo`} 
                  boxSize="50px" 
                  objectFit="cover" 
                />
                <Text fontWeight="bold" fontSize="xl">
                  {exchange.name}
                </Text>
                <Divider />
                <Stat>
                  <StatLabel><StarIcon /> Rank</StatLabel>
                  <StatNumber>{millify(exchange.trust_score_rank)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel><LinkIcon /> URL</StatLabel>
                  <StatNumber>
                    <a href={exchange.url} target="_blank" rel="noopener noreferrer">{exchange.url}</a>
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel><StarIcon /> 24h Trade Volume (BTC)</StatLabel>
                  <StatNumber>{millify(exchange.trade_volume_24h_btc)}</StatNumber>
                </Stat>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Exchange;
