import React from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Button, Grid, GridItem, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { KubernetesIcon, AWSIcon, AzureIcon, DigitalOceanIcon, GoogleCloudIcon } from "../icon";
import { CloudProvider, ProjectActionKind } from "../../providers/project";
import { useProjectState, useProjectDispatch } from "../../hooks/use-project";

function getIcon(cloudProvider: CloudProvider) {
  switch (cloudProvider) {
    case "kubernetes":
      return <Icon as={KubernetesIcon} w={"120px"} h={"21px"} />;
    case "aws":
      return <Icon mt={"4px"} as={AWSIcon} w={"90px"} h={"45px"} />;
    case "azure":
      return <Icon ml={"25px"} mt={"10px"} as={AzureIcon} w={"120px"} h={"40px"} />;
    case "do":
      return <Icon as={DigitalOceanIcon} w={"140px"} h={"21px"} />;
    case "gcp":
      return <Icon as={GoogleCloudIcon} w={"125px"} h={"20px"} />;
  }
}

export function OnboardingCloudProvider() {
  // define hooks
  const navigate = useNavigate();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { cloudProvider: cloudProviderState } = useProjectState();
  // if 'cloudProvider' not defined, get respetive previous section
  const [cloudProvider, setCloudProvider] = React.useState(cloudProviderState as CloudProvider);

  // define handlers
  const handleClickProvider = (p?: CloudProvider) => {
    if (!p) {
      // open "others" modal
      return;
    }

    setCloudProvider(p);
  };
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save name on project cloud provider context
    dispatch({ type: ProjectActionKind.SET_CLOUD_PROVIDER, payload: { cloudProvider } });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/credentials");
    }, 500);
  };
  const handleClickOthers = () => {
    console.log("here in handle click others");
  };

  // define effects
  React.useEffect(() => {
    if (!cloudProvider) {
      return;
    }

    setCloudProvider(cloudProvider);
    setReady(true);
  }, [cloudProvider]);

  function GetGridItem(providerName: CloudProvider) {
    return (
      <GridItem
        onClick={() => handleClickProvider(providerName)}
        w="100%"
        borderRadius={"8px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={2}
        pb={2}
        h={"60px"}
        borderStyle={"solid"}
        borderColor={cloudProvider && cloudProvider === providerName ? "pink.400" : "gray.200"}
        borderWidth={"1.5px"}
        color={cloudProvider && cloudProvider === providerName ? "gray.500" : "gray.400"}
        _hover={{
          borderColor: "pink.400",
          cursor: "pointer",
          color: "gray.500",
        }}
      >
        {getIcon(providerName)}
      </GridItem>
    );
  }

  function GetEmptyGridItem() {
    return (
      <GridItem
        onClick={() => handleClickOthers()}
        w="100%"
        borderRadius={"8px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={2}
        pb={2}
        h={"60px"}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        borderWidth={"1.5px"}
        color={"gray.400"}
        _hover={{
          borderColor: "pink.400",
          cursor: "pointer",
          color: "gray.500",
        }}
      >
        <Text>Others</Text>
      </GridItem>
    );
  }

  return (
    <OnBoardingBase
      title={"Cloud Provider"}
      description={<Text>Now you need to select a cloud provider to provision the infrastructure</Text>}
    >
      <FormControl>
        <VStack pt={5} alignItems={"start"} width={"full"}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5} w={"full"} pb={5}>
            {GetGridItem("kubernetes")}
            {GetGridItem("aws")}
            {GetGridItem("azure")}
            {GetGridItem("do")}
            {GetGridItem("gcp")}
            {GetEmptyGridItem()}
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
