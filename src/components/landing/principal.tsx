import {
  Button,
  VStack,
  Text,
  HStack,
  Link,
  Show,
  Box,
} from "@chakra-ui/react";

// TODO(ca): remove when we are in really production mode
const formURL = "https://forms.gle/FsbU18VJzuJgoQjp8";

export function Principal() {
  return (
    // image container
    <HStack
      w={"full"}
      h={"100vh"}
      bgImage={"url('/assets/bg_2-min.png')"}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      {/* black trasparent bg and text conteiner */}
      <VStack
        w={"full"}
        h={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundColor={"rgba(0, 0, 0, 0.15)"}
        spacing={3}
        paddingTop={20}
      >
          {/* title */}
          <Text
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            color="pink.400"
            backgroundColor={"rgb(255, 255, 255, 0.95)"}
            px={[2, 2, 4, 6]}
            textAlign={"center"}
          >
            Revolutionizing Web3
          </Text>

          {/* subtitle */}
          <Text
            fontSize={["2xl", "3xl", "4xl", "5xl"]}
            fontWeight={["medium", "medium", "bold"]}
            textAlign={"center"}
            color="blackAlpha.800"
          >
            <Text
              backgroundColor={"rgb(255, 255, 255, 0.95)"}
              mt={["0", "-2%"]}
              mx={[2]}
              px={[2, 2, 4, 6]}
              py={[0, 1]}
              as={"span"}
            >
              Infrastructure{" "}and{" "}Development
            </Text>
          </Text>

          <HStack
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Text
              color="white"
              fontSize={["xl", "2xl"]}
              fontWeight="light"
              backgroundColor="pink.400"
              px={[1, 2, 4, 6]}
              textAlign={"center"}
              ml={[12, 16]}
              mr={[12, 16]}
            >
              Build better and faster decentralized applications
            </Text>
          </HStack>
          <Link href="https://docs.darchlabs.com/docs/intro">
            <Button
              mt={5}
              size={"lg"}
              colorScheme={"white"}
              bgColor={"white"}
              color={"pink.400"}
              onClick={() => window.location.replace(formURL)}
            >
              Start Now
            </Button>
          </Link>
      </VStack>
    </HStack>
  );
}
