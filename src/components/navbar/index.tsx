import { Link, HStack, Icon, Text, Hide } from "@chakra-ui/react";
import LogoIcon from "../icon/logo-white";

// TODO(ca): remove when we are in really production mode
const formURL = "https://forms.gle/FsbU18VJzuJgoQjp8";

export function Navbar() {
  return (
    <HStack
      w={"full"}
      position={"absolute"}
      justifyContent={"space-between"}
      pl={[7, 10]}
      pr={[7, 10]}
      pt={[4, 5]}
      pb={[4, 5]}
      zIndex={"1"}
    >
      <Icon
        as={LogoIcon}
        w={["110px", "110px", "135px"]}
        h={["55px", "55px", "66px"]}
      />

      <HStack>
        <HStack pr={"5"}>
          <Hide below="md">
            <Text fontWeight={"bold"} color="white" pr={"2.5"} fontSize={"xl"}>
              WHY DARCH?
            </Text>
          </Hide>
          <Link href="https://docs.darchlabs.com/docs/intro" _hover={{
            borderColor: "transparent"
          }}>
            <Text
              fontWeight={"bold"}
              color="white"
              fontSize={"xl"}
            >
              DOCS
            </Text>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
}
