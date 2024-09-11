import { Box, Text, Flex, HStack, IconButton, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaNewspaper, FaHome } from "react-icons/fa";
import { MdOutlineCurrencyExchange } from "react-icons/md";




export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4} w="100vw" bg="bg.dark" color="text.dark">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link to="/">
            <Text
              fontSize={{ base: "2xl", md: "3xl" }} // Adjust size for responsiveness
              fontWeight="bold"
              color="black"
            >
              CoinVoyage
            </Text>
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <HStack>
              <FaHome />
              <Text>Home</Text>
            </HStack>
          </Link>
          <Link to="/exchange">
            <HStack>
              <MdOutlineCurrencyExchange />
              <Text>Exchange</Text>
            </HStack>
          </Link>
          <Link to="/news">
            <HStack>
              <FaNewspaper />
              <Text>News</Text>
            </HStack>
          </Link>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          mr={6}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Navigation */}
      {isOpen ? (
        <Box  pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link to="/">
              <HStack>
                <FaHome />
                <Text>Home</Text>
              </HStack>
            </Link>
            <Link to="/exchange">
              <HStack>
                <MdOutlineCurrencyExchange />
                <Text>Exchange</Text>
              </HStack>
            </Link>
            <Link to="/news">
              <HStack>
                <FaNewspaper />
                <Text>News</Text>
              </HStack>
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
