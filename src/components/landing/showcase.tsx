import {useState} from "react";
import {VStack, Text, Box, HStack, Select, Hide} from "@chakra-ui/react";
import ReactPlayer from "react-player/youtube";

const steps: {
  name: string;
  url: string;
}[] = [
    {
      name: "synchronizers",
      url: "https://youtu.be/r2EHAjZ2Nmc",
    },
    {
      name: "jobs",
      url: "https://youtu.be/265en6eZ4BE",
    },
    {
      name: "nodes",
      url: "https://youtu.be/i4DitH9sVk0",
    },
  ];

function Stepper({
  url,
  currentIndex,
  setCurrentIndex,
}: {
  url: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  // define handlers
  function handleVideo(index: number) {
    setCurrentIndex(index);
  }

  return (
    <>
      <Hide above="md">
        <Box w={"full"} pl={[5, 10]} pr={[5, 10]}>
          <Select
            maxW={"755px"}
            bgColor={"white"}
            color={"pink.400"}
            borderColor={"pink.400"}
            onChange={(ev: any) => handleVideo(ev.target.value)}
          >
            {steps.map((step, index) => (
              <option value={index}>{step.name.toUpperCase()}</option>
            ))}
          </Select>
        </Box>
      </Hide>
      <Box pt={[5, 5, 0]} w={["full"]} maxW={"755px"} pl={[5, 10]} pr={[5, 10]}>
        <ReactPlayer width={"100%"} url={url} />
      </Box>
      <Hide below="md">
        <Box w={"full"} maxW={"755px"}>
          <HStack spacing={0} pt={10} w={"full"}>
            {steps.map((_, index) => (
              <Box
                key={index}
                as={"span"}
                bgColor={"pink.500"}
                _first={{
                  borderLeftRadius: "15px",
                }}
                _last={{
                  borderRightRadius: "15px",
                }}
                flex={1}
                display={"flex"}
                height={"20px"}
                justifyContent={"center"}
                alignItems={"center"}
                alignContent={"center"}
                onClick={() => handleVideo(index)}
                cursor={"pointer"}
              >
                <Box
                  w={"10px"}
                  h={"10px"}
                  bgColor={currentIndex === index ? "pink.100" : "pink.400"}
                  borderRadius={"50%"}
                ></Box>
              </Box>
            ))}
          </HStack>
          <HStack spacing={0} pt={3} w={"full"}>
            {steps.map((step, index) => (
              <Text
                key={index}
                textAlign={"center"}
                flex={1}
                color={"pink.700"}
                textTransform={"uppercase"}
                fontSize={"md"}
                cursor={"pointer"}
                onClick={() => handleVideo(index)}
              >
                {step.name}
              </Text>
            ))}
          </HStack>
        </Box>
      </Hide>
    </>
  );
}

export function Showcase(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0 as number);

  return (
    <VStack w={"full"} bgGradient={"linear(to-b, white 0%, pink.100 50%, pink.200 100%)"} pb={10}>
      <Text
        pt={32}
        pb={10}
        lineHeight={"32px"}
        fontSize={"4xl"}
        color={"pink.400"}
        textAlign={"center"}
        pl={[5, 10]}
        pr={[5, 10]}
      >
        Optimize and customize your workflow to your needs
      </Text>
      <Stepper url={steps[currentIndex].url} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </VStack>
  );
}
