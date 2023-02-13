import React from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Button, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useProjectState, useProjectDispatch } from "../../hooks/use-project";
import { Environment, ProjectActionKind } from "../../providers/project";

export function OnboardingEnvironment() {
  // define hooks
  const navigate = useNavigate();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { environment: environmentState } = useProjectState();
  // if 'environment' not defined, get respetive previous section
  const [environment, setEnvironment] = React.useState(environmentState as Environment);

  // define handlers
  const handleClickEnvironment = (env: Environment) => setEnvironment(env);
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save environment on project provider context
    dispatch({ type: ProjectActionKind.SET_ENVIRONMENT, payload: { environment } });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/wallet");
    }, 500);
  };

  // define effects
  React.useEffect(() => setReady(environment === "development" || environment === "production"), [environment]);

  // component
  function GetGridItem(env: Environment, text: string) {
    return (
      <GridItem
        onClick={() => handleClickEnvironment(env)}
        w="100%"
        borderRadius={"8px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={3}
        pb={3}
        borderStyle={"solid"}
        borderColor={environment === env ? "pink.400" : "gray.200"}
        borderWidth={environment === env ? "1.5px" : "1px"}
        color={environment === env ? "gray.500" : "gray.400"}
        _hover={{
          borderColor: "pink.400",
          cursor: "pointer",
          color: "gray.500",
          borderWidth: "1.5px",
        }}
      >
        <Text fontSize={"md"}>{text}</Text>
      </GridItem>
    );
  }

  return (
    <OnBoardingBase title={"Select Environment"} description={<Text>Now we must configure the environment</Text>}>
      <FormControl>
        <VStack pt={5} alignItems={"start"} width={"full"}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5} w={"full"} pb={5}>
            {GetGridItem("development", "Development")}
            {GetGridItem("production", "Production")}
          </Grid>

          <Button
            onClick={handleSubmitForm}
            isLoading={isSubmitting}
            disabled={!ready}
            width={"full"}
            bgColor={"pink.400"}
            fontWeight={"normal"}
            color={"white"}
            type="submit"
            size={"lg"}
          >
            Continue
          </Button>
        </VStack>
      </FormControl>
    </OnBoardingBase>
  );
}
