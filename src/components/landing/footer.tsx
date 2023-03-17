import { HStack, VStack, Text, Button, Icon, Box, Flex } from "@chakra-ui/react";
import LogoHIcon from "../icon/logo-h";
import { FaTwitter, FaMediumM, FaGithub } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
// import { useNavigate } from "react-router-dom";

// TODO(ca): remove when we are in really production mode
const formURL = "https://forms.gle/FsbU18VJzuJgoQjp8";

export function Footer(): JSX.Element {
  // define hooks
  // const navigate = useNavigate();

  return (
    <VStack
      alignItems={["center", "center", "start"]}
      w={"full"}
      pl={[7, 10, 20, 28]}
      pr={[7, 10, 20, 28]}
      pt={[12, 12, 14]}
      pb={[12, 12, 14]}
    >
      <Flex direction={["column", "column", "row"]} w={"full"}>
        <VStack flex={["auto", "auto", 0.4]} alignItems={["center", "center", "start"]} pr={[0, 0, 5]}>
          <Icon as={LogoHIcon} w={"235px"} h={"51px"} />
          <Text color={"gray.500"} fontSize={["xl", "xl", "xl"]} pt={5}>
            Why Darch?
          </Text>
          <Text
            color={"gray.500"}
            fontSize={["xl", "xl", "xl"]}
            pt={[1, 0]}
            cursor={"pointer"}
            onClick={() => window.location.replace("https://docs.darchlabs.com")}
          >
            Docs
          </Text>
          <Text
            color={"gray.500"}
            fontSize={["xl", "xl", "xl"]}
            cursor={"pointer"}
            onClick={() => window.location.replace(formURL)}
            pt={[1, 0]}
          >
            Contact Us
          </Text>
          <HStack spacing={5} pt={[8, 8, 5]} color={"blackAlpha.800"}>
            {/* <Icon
              as={FaTelegramPlane}
              boxSize={[8, 8, 6]}
              cursor={"pointer"}
              onClick={() => window.location.replace("https://github.com/darchlabs")}
            /> */}
            <Icon
              as={FaGithub}
              boxSize={[8, 8, 6]}
              cursor={"pointer"}
              onClick={() => window.location.replace("https://github.com/darchlabs")}
            />
            <Icon
              as={FaTwitter}
              boxSize={[8, 8, 6]}
              cursor={"pointer"}
              onClick={() => window.location.replace("https://twitter.com/darchlabs")}
            />
            <Icon
              as={FaMediumM}
              boxSize={[8, 8, 6]}
              cursor={"pointer"}
              onClick={() => window.location.replace("https://medium.com/@darchlabs")}
            />
          </HStack>
        </VStack>
        <VStack
          alignItems={["center", "center", "center", "start"]}
          justifyContent={"center"}
          flex={["auto", "auto", 0.6]}
          pt={[8, 8, 0]}
        >
          <Text letterSpacing={"wider"} fontWeight={"bold"} fontSize={["2xl", "2xl", "3xl"]} color={"blackAlpha.800"}>
            Get in touch
          </Text>
          <Text fontSize={["lg", "lg", "xl"]} color={"gray.500"} textAlign={["center", "center", "center", "left"]}>
            Join us and learn from the best Web3 builder community
          </Text>
          <Box pt={2}>
            <Button
              rightIcon={<Icon as={SiDiscord} boxSize={6} />}
              size={"lg"}
              colorScheme={"pink"}
              bgColor={"pink.400"}
            >
              Join the Discord Community
            </Button>
          </Box>
        </VStack>
      </Flex>
      <Text color={"gray.500"} letterSpacing={"tight"} pt={[8, 5]} textAlign={["center", "center", "start"]}>
        DarchLabs 2023 © All Rights Reserved
      </Text>
    </VStack>
  );
}
