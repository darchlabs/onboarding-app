import React from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Button, Grid, GridItem, Icon, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MetamaskIcon from "../icon/metamask";
import WalletConnectIcon from "../icon/walletconnect";
import { useProjectState, useProjectDispatch } from "../../hooks/use-project";
import { ProjectActionKind, WalletProvider } from "../../providers/project";

function getIcon(wallet: WalletProvider) {
  switch (wallet) {
    case "metamask":
      return <Icon as={MetamaskIcon} w={"30px"} h={"30px"} mr={2} />;
    case "walletconnect":
      return <Icon ml={"-10px"} as={WalletConnectIcon} w={"40px"} h={"40px"} mr={1} />;
    default:
  }

  return null;
}

export function OnboardingWallet() {
  // define hooks
  const navigate = useNavigate();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { walletProvider: walletProviderState } = useProjectState();
  // if 'walletProvider' not defined, get respetive previous section
  const [walletProvider, setWalletProvider] = React.useState(walletProviderState as WalletProvider);

  // define handlers
  const handleClickWallet = (wp: WalletProvider) => setWalletProvider(wp);
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save wallet on project provider context
    dispatch({ type: ProjectActionKind.SET_WALLET, payload: { provider: walletProvider, address: "" } });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/cloud-provider");
    }, 500);
  };

  // define effects
  React.useEffect(
    () => setReady(walletProvider === "metamask" || walletProvider === "walletconnect"),
    [walletProvider]
  );

  function GetGridItem(wp: WalletProvider, text: string) {
    return (
      <GridItem
        onClick={() => handleClickWallet(wp)}
        w="100%"
        borderRadius={"8px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={2}
        pb={2}
        borderStyle={"solid"}
        borderColor={walletProvider === wp ? "pink.400" : "gray.200"}
        borderWidth={"1.5px"}
        color={walletProvider === wp ? "gray.500" : "gray.400"}
        _hover={{
          borderColor: "pink.400",
          cursor: "pointer",
          color: "gray.500",
        }}
      >
        {getIcon(wp)}
        <Text fontSize={"sm"}>{text}</Text>
      </GridItem>
    );
  }

  // component
  return (
    <OnBoardingBase title={"Connect wallet"} description={<Text>Now we need to connect your wallet</Text>}>
      <FormControl>
        <VStack pt={5} alignItems={"start"} width={"full"}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5} w={"full"} pb={5}>
            {GetGridItem("metamask", "Metamask")}
            {GetGridItem("walletconnect", "WalletConnect")}
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

          <Box display={"flex"} justifyContent={"center"} w={"100%"}>
            <Text
              mt={1}
              fontSize={"sm"}
              color={"pink.400"}
              onClick={handleSubmitForm}
              _hover={{
                cursor: "pointer",
              }}
            >
              skip
            </Text>
          </Box>
        </VStack>
      </FormControl>
    </OnBoardingBase>
  );
}
