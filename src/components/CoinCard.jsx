/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Skeleton,
  useBreakpointValue
} from "@chakra-ui/react";
import millify from "millify";
import { Link } from "react-router-dom";

const CoinCard = ({ coins, loading }) => {
  const [itemsToShow, setItemsToShow] = useState(10);

  // Display the coins based on itemsToShow
  const displayedCoins = coins.slice(0, itemsToShow);

  // Show more items by increasing the itemsToShow count by 10
  const showMoreItems = () => {
    setItemsToShow((prev) => prev + 10);
  };

  // Toggle button text based on the number of items displayed
  const buttonText = itemsToShow >= coins.length ? "Show Less" : "More Crypto";

  // Use responsive value for table size
  const tableSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={6}>
        Top Trending Cryptocurrencies
      </Heading>

      {loading ? (
        <Skeleton height="300px" />
      ) : (
        <Table variant="simple" size={tableSize}>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Coin</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Market Cap</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedCoins.map((coin) => (
              <Tr
                key={coin.id}
                _hover={{ bg: "gray.100" }} // Change background color on hover
              >
                <Td>{coin.market_cap_rank}</Td>
                <Td>
                  <Link to={`/${coin.id}`}>
                    <Box display="flex" alignItems="center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        style={{ width: "30px", marginRight: "10px" }}
                      />
                      <Text>{coin.name}</Text>
                    </Box>
                  </Link>
                </Td>
                <Td isNumeric>${millify(coin.current_price, { precision: 2 })}</Td>
                <Td isNumeric>${millify(coin.market_cap)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* "More Crypto" Button */}
      <Box mt={4} textAlign="center">
        <Button
          onClick={showMoreItems}
          colorScheme="teal"
          disabled={itemsToShow >= coins.length} // Disable button if all items are shown
          size={useBreakpointValue({ base: "sm", md: "md" })} // Responsive button size
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default CoinCard;
