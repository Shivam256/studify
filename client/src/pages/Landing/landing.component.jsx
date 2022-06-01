import { Box, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import LandingPage from "../../assets/LandingPage.png";
import { Button } from "@chakra-ui/button";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Box fontFamily="'Montserrat', sans-serif" position="relative">
      <Image
        w="100%"
        h="100vh"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="-1"
        src={LandingPage}
      ></Image>
      <Flex
        flexWrap={{ base: "wrap", md: "nowrap" }}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        p={{ md: "3rem", base: "2rem" }}
        h={{ md: "100vh", base: "100vh" }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            fontFamily="'Montserrat', sans-serif"
            color="white"
            fontSize={{ base: "4rem", md: "8.5rem" }}
            fontWeight="800"
          >
            Studify
          </Box>
          <Box
            color="white"
            pr="1rem"
            fontSize={{ base: "1.4rem", md: "2rem" }}
          >
            Where the worlds best and brightest come to teach
          </Box>
          <Button
            p="1.5rem"
            borderRadius="0.4rem"
            fontSize="1.4rem"
            m="2rem 0rem"
            color="white"
            backgroundColor="#fb7883"
            _hover="#D3D3D3"
          >
            <Link to="/sign-in">Start Learning</Link>
          </Button>
        </Flex>
        <Flex
          // mt={{ base: "-8rem", md: "0rem" }}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            w={{ base: "20rem", md: "30rem" }}
            h={{ base: "20rem", md: "30rem" }}
            src={hero}
          ></Image>
        </Flex>
        <Box
          color="white"
          position="absolute"
          top={{ md: "94%", base: "94%" }}
          bottom="0%"
          textAlign="center"
          left="50%"
          transform="translate(-50%,-50%)"
        >
          Made with ❤️ by TuringMachine
        </Box>
      </Flex>
    </Box>
  );
};

export default Landing;
