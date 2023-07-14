import {Box, VStack, Text, Flex} from "@chakra-ui/react";

function Characteristic({
  top,
  tittle,
  description,
}: {
  top: string;
  tittle: string | JSX.Element;
  description: string;
}): JSX.Element {
  return (
    <VStack
      pl={[2, 5]}
      pr={[2, 5]}
      pt={[10, 10]}
      w={"full"}
      alignItems={"start"}
      _first={{
        // backgroundColor: "red",
        paddingTop: [0, 0, 10],
      }}
    // bgColor={"green"}
    >
      <Box height={"1px"} bgColor={"blackAlpha.200"} w={"full"}></Box>
      <Text
        pt={[5, 5, 10]}
        letterSpacing={"wider"}
        fontWeight={"light"}
        color={"pink.500"}
        fontSize={"lg"}
        textTransform={"uppercase"}
      >
        {top}
      </Text>
      <Text fontWeight={"bold"} fontSize={["xl", "xl", "2xl"]} color={"blackAlpha.800"} lineHeight={"30px"} pt={3}>
        {tittle}
      </Text>
      <Text
        fontWeight={"light"}
        fontSize={["xl", "xl", "2xl"]}
        color={"gray.500"}
        letterSpacing={"wider"}
        lineHeight={"30px"}
        pt={2}
      >
        {description}
      </Text>
    </VStack>
  );
}

const characteristics: {top: string; tittle: string | JSX.Element; description: string}[] = [
  {
    top: "synchronizers",
    tittle: (
      <Text as={"span"}>
        <Text as={"span"} color={"pink.400"}>
          sync
        </Text>{" "}
        and access{" "}
        <Text as={"span"} color={"pink.400"}>
          on-chain data
        </Text>{" "}
        making it faster and{" "}
        <Text as={"span"} color={"pink.400"}>
          better
        </Text>
      </Text>
    ),
    description: "Speedup development, improve the experience, and deliver better decentralized applications.",
  },
  {
    top: "jobs",
    tittle: (
      <Text as={"span"}>
        Perform{" "}
        <Text as={"span"} color={"pink.400"}>
          smart contract
        </Text>{" "}
        interactions with{" "}
        <Text as={"span"} color={"pink.400"}>
          no effort
        </Text>
      </Text>
    ),
    description:
      "Schedule operations and make autonomous and self-sufficient smart contracts.",
  },
  {
    top: "nodes",
    tittle: (
      <Text as={"span"}>
        Create and{" "}
        <Text as={"span"} color={"pink.400"}>
          manage nodes
        </Text>{" "}
        easier and{" "}
        <Text as={"span"} color={"pink.400"}>
          faster
        </Text>{" "}
        than ever
      </Text>
    ),
    description:
      "Run, maintain, and manage nodes for web3 development and production infrastructure.",
  },
];

export function Characteristics(): JSX.Element {
  return (
    <VStack bgColor={"white"} pl={5} pr={5}>
      <Text pt={40} pb={10} lineHeight={"24px"} fontSize={["3xl", "4xl"]} color={"pink.400"}>
        Why Darch?
      </Text>
      <Flex alignItems={"start"} direction={["column", "column", "row"]}>
        {characteristics.map(({top, tittle, description}, index) => (
          <Characteristic key={index} top={top} tittle={tittle} description={description} />
        ))}
      </Flex>
    </VStack>
  );
}
