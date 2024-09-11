import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    VStack,
    Container,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import backgroundImage from '../assets/images/crypto.avif'; // Update with your actual image path
  
  
  function HeroComponent() {
    return (
      <Flex
        w="full"
        h={{ base: "60vh", md: "70vh", lg: "70vh" }}
        backgroundImage={`url(${backgroundImage})`} // Set background image here
        backgroundSize="cover" // Ensures the image covers the container without stretching
        backgroundPosition="center center" // Centers the image
        backgroundRepeat="no-repeat" // Prevents image from repeating
        align="center"
        justify="center"
      >
        <Box
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.4)" // Optional: Add a semi-transparent overlay if needed for better text visibility
        >
          <Container maxW="container.lg" centerContent>
            <VStack spacing={6} textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                color="white"
                fontWeight="bold"
                px={4}
              >
                Welcome to Crypto World
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="white"
                maxW="3xl"
                mx="auto"
                px={4}
              >
                Explore the latest trends in the cryptocurrency market and stay
                ahead with real-time updates. Join now and be part of the future of finance.
              </Text>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="center"
                spacing={4}
              >
                <Link to="/exchange">
                  <Button
                    size="lg"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    mb={{ base: 4, md: 0 }}
                    px={6}
                  >
                    Start Trading
                  </Button>
                </Link>
                <Link to="/news">
                  <Button
                    size="lg"
                    bg="whiteAlpha.800"
                    color="black"
                    _hover={{ bg: "whiteAlpha.900" }}
                    px={6}
                    ml={6}
                  >
                    Finance News
                  </Button>
                </Link>
              </Flex>
            </VStack>
          </Container>
        </Box>
      </Flex>
    );
  }
  
  export default HeroComponent;
  