import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinDetail } from '../services/fetchapi';
import { Box,Link, Spinner, Text, Heading, Image, Flex, Divider, Select, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import millify from 'millify';
import { DollarCircleOutlined, FundOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import LineChart from '../components/LineChart';


const CryptoDetail = () => {
  const { coinId } = useParams();
  const [coinDetail, setCoinDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('7'); // Default time period

  useEffect(() => {
    const getCoinDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchCoinDetail(coinId);
        setCoinDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);

    getCoinDetail();
  }, [coinId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!coinDetail) {
    return <Text>No details available for this coin.</Text>;
  }

  return (
    <Box m={[5, 10]} p={[2, 5]}>
      {/* Coin Title */}
      <Heading   as="h1" mb="5" fontSize={['2xl', '4xl']}>
        {coinDetail.name} ({coinDetail.symbol.toUpperCase()})
      </Heading>
      <Text mb="3" fontSize={['md', 'lg']}>
        <Link href={coinDetail.links.homepage[0]} isExternal color="blue.500">
            Official Website
        </Link>
      </Text>

      {/* Coin Image and Description */}
      <Flex direction={{ base: 'column', md: 'row' }} align="center" mb="10">
        <Image
          src={coinDetail.image.large}
          alt={`${coinDetail.name} logo`}
          boxSize={['80px', '100px']}
          mr={{ md: "10" }}
        />
        <Box maxW="800px">
          <Text mb="3" fontSize={['md', 'lg']}>
            {coinDetail.description?.en?.split('. ').slice(0, 2).join('. ') || "No description available."}
          </Text>
        </Box>
      </Flex>

      <Divider mb="5" />

      {/* Market Data */}
      <Flex wrap="wrap" direction={{ base: 'column', md: 'row' }} justify="space-between" mb="10" gap={[3, 6]}>
        <Stat flex="1">
          <StatLabel display="flex" alignItems="center">
            <DollarCircleOutlined style={{ marginRight: '8px' }} /> Current Price
          </StatLabel>
          <StatNumber fontSize={['xl', '2xl']}>${millify(coinDetail.market_data.current_price.usd)}</StatNumber>
        </Stat>

        <Stat flex="1">
          <StatLabel display="flex" alignItems="center">
            <TrophyOutlined style={{ marginRight: '8px' }} /> Market Cap
          </StatLabel>
          <StatNumber fontSize={['xl', '2xl']}>${millify(coinDetail.market_data.market_cap.usd)}</StatNumber>
        </Stat>

        <Stat flex="1">
          <StatLabel display="flex" alignItems="center">
            <FundOutlined style={{ marginRight: '8px' }} /> 24h Trading Volume
          </StatLabel>
          <StatNumber fontSize={['xl', '2xl']}>${millify(coinDetail.market_data.total_volume.usd)}</StatNumber>
        </Stat>

        <Stat flex="1">
          <StatLabel display="flex" alignItems="center">
            <ThunderboltOutlined style={{ marginRight: '8px' }} /> Price Change (24h)
          </StatLabel>
          <StatNumber fontSize={['xl', '2xl']}>
            {coinDetail.market_data.price_change_percentage_24h?.toFixed(2) || "N/A"}%
          </StatNumber>
          <StatHelpText>
            {coinDetail.market_data.price_change_24h_in_currency.usd > 0 ? 'Up' : 'Down'} in the last 24 hours
          </StatHelpText>
        </Stat>

        {/* 7d Price Change */}
        <Stat flex="1">
          <StatLabel display="flex" alignItems="center">
            <ThunderboltOutlined style={{ marginRight: '8px' }} /> Price Change (7d)
          </StatLabel>
          <StatNumber fontSize={['xl', '2xl']}>
            {coinDetail.market_data.price_change_percentage_7d?.toFixed(2) || "N/A"}%
          </StatNumber>
        </Stat>
      </Flex>

      <Divider mb="5" />

      {/* Time Period Dropdown */}
      <Box mb="5" maxW="200px">
        <Select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          placeholder="Select Time Period"
        >
          <option value="1">24h</option>
          <option value="7">7d</option>
          <option value="30">30d</option>
          <option value="365">1Y</option>
          <option value="730">2Y</option>
        </Select>
      </Box>

      {/* Price History Chart */}
      <LineChart coinId={coinId} timePeriod={timePeriod} />
    </Box>
  );
};

export default CryptoDetail;
