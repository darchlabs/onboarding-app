import {Box, VStack, Text, Flex} from "@chakra-ui/react";

function Characteristic({
  top,
  title,
  description,
}: {
  top: string;
  title: string | JSX.Element;
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
        paddingTop: [0, 0, 10],
      }}
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
      <Text
        fontWeight={"bold"}
        fontSize={["xl", "xl", "2xl"]}
        color={"blackAlpha.800"}
        lineHeight={"30px"}
        pt={3}
      >
        {title}
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

const characteristics: {top: string; title: string | JSX.Element; description: string}[] = [
  {
    top: "synchronizers",
    title: (
      <Text as={"span"}>
        <Text as={"span"} color={"pink.400"}>
          Sync
        </Text>{" "}
        and access{" "}
        <Text as={"span"} color={"pink.400"}>
          on-chain data
        </Text>{" "}
        making it faster and{" "}
        <Text as={"span"} color={"pink.400"}>
          better
        </Text>
        way
      </Text>
    ),
    description: "Speedup development, improve the experience, and deliver better decentralized applications.",
  },
  {
    top: "webhooks",
    title: (
      <Text as={"span"}>
        Connect{" "}
        <Text as={"span"} color={"pink.400"}>
        servers
        </Text>{" "}
        through{" "}
        <Text as={"span"} color={"pink.400"}>
        synchronizers
        </Text>{" "}
        with ease
      </Text>
    ),
    description:
      "Interact seamlessly with other smart contracts for holistic web3 solutions.",
  },
  {
    top: "jobs",
    title: (
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
];

export function Characteristics(): JSX.Element {
  return (
    <VStack bgColor={"white"} pl={5} pr={5}>
      <Text
        pt={20}
        pb={10}
        lineHeight={"24px"}
        fontSize={["3xl", "4xl"]}
        color={"pink.400"}
      >
        Why Darch?
      </Text>
      <Flex alignItems={"start"} direction={["column", "column", "row"]}>
        {characteristics.map(({top, title, description}, index) => (
          <Characteristic key={index} top={top} title={title} description={description} />
        ))}
      </Flex>
    </VStack>
  );
}
