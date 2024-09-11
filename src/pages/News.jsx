import { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Grid, GridItem, Button, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { fetchNews } from "../services/fetchapi";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const data = await fetchNews(page); // Pass page to fetch news
        setNewsData(data); // Assuming API returns articles array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchData();
    window.scrollTo(0, 0); 
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1); // Decrement page number
  };

  return (
    <Box p={5}>
      {loading ? (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {[...Array(9)].map((_, index) => (
            <GridItem key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Skeleton height="200px" mb={3} />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {newsData.map((news, index) => (
            <GridItem key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Heading fontSize="lg" mb={3} noOfLines={2}>
                {news.title}
              </Heading>

              <Box mb={3} position="relative" overflow="hidden" borderRadius="lg">
                <Image
                  src={
                    news.media?.[0] ||
                    'https://media.istockphoto.com/id/175599141/photo/business-planning.jpg?s=612x612&w=0&k=20&c=DnUXqEra6OdmsIBkfDTCR3A5XeYF-uNbBGxq59ux6RU='
                  }
                  alt={news.title}
                  objectFit="cover"
                  width="100%"
                  height="200px" // Fixed height for better alignment
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }} // Hover zoom effect
                />
              </Box>

              {/* Truncated summary */}
              <Text noOfLines={3} mb={3}>
                {news.summary}
              </Text>

              {/* Button with hover effect for "Read More" */}
              <Button
                as="a"
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="teal"
                variant="outline"
                _hover={{ bg: "teal.500", color: "white" }}
                mb={3}
              >
                Read More
              </Button>

              {/* Display author and formatted published date */}
              <Text fontSize="sm" color="gray.500">
                Author: {news.authors?.[0]?.name || "Unknown"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Published on: {new Date(news.published).toLocaleDateString()}
              </Text>
            </GridItem>
          ))}
        </Grid>
      )}

      {/* Pagination Controls */}
      <Flex justify="center" alignItems="center" mt={8}>
        <Button
          onClick={handlePrevPage}
          isDisabled={page === 1}
          mr={4}
          colorScheme="teal"
          variant="outline"
        >
          Previous
        </Button>
        <Text mx={4}>
          Page {page}
        </Text>
        <Button
          onClick={handleNextPage}
          colorScheme="teal"
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default News;
