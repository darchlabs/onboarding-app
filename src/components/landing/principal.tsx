import { Button, VStack, Text, Flex } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// TODO(ca): remove when we are in really production mode
const formURL = "https://forms.gle/FsbU18VJzuJgoQjp8";

export function Principal() {
  // define hooks
  // const navigate = useNavigate();

  return (
    <VStack w={"full"} h={"full"} bgColor={"white"}>
      <VStack spacing={20} bgColor={"white"} w={"full"} h={"full"} display={"flex"} alignContent={"center"}>
        <Text textAlign={"center"} pt={48}>
          <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight="bold" color="pink.400">
            Revolutionizing Web3
          </Text>
          <Text fontSize={["3xl", "4xl", "5xl"]} fontWeight="bold" color="blackAlpha.800" mt={["0", "-2%"]}>
            Infrastructure and Development
          </Text>
          <Text color="gray.500" fontSize={["xl", "2xl"]} fontWeight="light">
            Build better, faster and autonomous decentralized applications
          </Text>
        </Text>

        <Flex direction={["column", "row"]} width={["full", "auto"]} pl={[10, 5, 0]} pr={[10, 5, 0]}>
          <Button
            size={"lg"}
            colorScheme={"pink"}
            bgColor={"pink.400"}
            onClick={() => window.location.replace(formURL)}
            mr={[0, 6]}
          >
            Contact Us
          </Button>
          {/* <Button mt={[5, 0]} size={"lg"} colorScheme={"pink"} color={"pink.400"} variant={"outline"}>
            Compare plans
          </Button> */}
        </Flex>
      </VStack>
    </VStack>
  );
}
