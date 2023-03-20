import { Button, HStack, Icon, Text, Hide } from "@chakra-ui/react";
import LogoIcon from "../icon/logo";
// import { useNavigate } from "react-router-dom";

// TODO(ca): remove when we are in really production mode
const formURL = "https://forms.gle/FsbU18VJzuJgoQjp8";

export function Navbar() {
  // define hooks
  // const navigate = useNavigate();

  return (
    <HStack
      w={"full"}
      bgColor="white"
      justifyContent={"space-between"}
      pl={[7, 10]}
      pr={[7, 10]}
      pt={[4, 5]}
      pb={[4, 5]}
      boxShadow={"lg"}
      zIndex={"1"}
    >
      <Icon
        as={LogoIcon}
        w={["81px", "101px", "135px"]}
        h={["40px", "50px", "66px"]}
      />

      <HStack>
        <Hide below="md">
          <HStack pr={"5"}>
            <Text fontWeight={"bold"} color="pink.400" pr={"2.5"}>
              WHY DARCH?
            </Text>
            <Text
              fontWeight={"bold"}
              color="pink.400"
              cursor={"pointer"}
              onClick={() =>
                window.location.replace("https://docs.darchlabs.com/docs/intro")
              }
            >
              DOCS
            </Text>
          </HStack>
        </Hide>

        <Button
          colorScheme={"pink"}
          color={"pink.400"}
          variant={"outline"}
          onClick={() => window.location.replace(formURL)}
        >
          Contact Us
        </Button>
      </HStack>
    </HStack>
  );
}
