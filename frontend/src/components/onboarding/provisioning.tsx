import { useEffect } from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Button, Box, CircularProgress } from "@chakra-ui/react";
import { useProjectState, useProjectDispatch } from "../../hooks/use-project";
import { ProjectActionKind } from "../../providers";

export function OnboardingProvisioning() {
  // define hooks
  const { provisioning, ready } = useProjectState();
  const dispatch = useProjectDispatch();

  // define handlers
  const handleSubmitForm = () => {
    console.log("here in handle click button");
  };

  // define elements to use in component
  const bigReady = provisioning && !ready;
  let description = <Text>error</Text>;
  if (bigReady) {
    description = <Text>We are now provisioning the infrastructure in your cloud, please wait a moment</Text>;
  } else if (!provisioning && ready) {
    description = (
      <Text>
        Your infrastructure is ready to be used. <Text>Enjoy.</Text>
      </Text>
    );
  }

  // define effects
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ProjectActionKind.SET_READY });
    }, 5555);
  }, [dispatch]);

  return (
    <OnBoardingBase title={"Provisioning"} description={description}>
      <FormControl>
        <VStack pt={3} alignItems={"start"} width={"full"}>
          {bigReady ? (
            <Box display={"flex"} justifyContent={"center"} pb={5} w={"full"}>
              <CircularProgress isIndeterminate color="pink.400" size={"60px"} thickness={"4px"} />
            </Box>
          ) : (
            <Box pb={3}></Box>
          )}

          <Button
            onClick={handleSubmitForm}
            disabled={bigReady}
            width={"full"}
            bgColor={"pink.400"}
            fontWeight={"normal"}
            color={"white"}
            type="submit"
            size={"lg"}
          >
            {bigReady ? "Wait a few moment" : "Lets go"}
          </Button>
        </VStack>
      </FormControl>
    </OnBoardingBase>
  );
}
