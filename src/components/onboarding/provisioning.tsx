// import { useEffect } from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Button, Box, CircularProgress } from "@chakra-ui/react";
import { useProjectState, useProjectDispatch } from "../../hooks/use-project";
import { ProjectActionKind } from "../../providers";
import { ProjectState } from "../../providers/project/type";
import { useNavigate } from "react-router-dom";
import { ConsoleWriter } from "istanbul-lib-report";

const { REACT_APP_ONBOARDING_URL } = process.env;

const errors = {
  INVALID_CREDENTIALS: "invalid credentials",
  INVALID_PULUMI: "invalid pulumi credential",
  UNAUTHORIZED_PULUMI: "unauthorized operation",
};

export function OnboardingProvisioning() {
  // define hooks
  const {
    name,
    password,
    environment,
    walletProvider,
    walletAddress,
    cloudProvider,
    credentialsK8sConfig,
    credentialsAwsAccessKeyId,
    credentialsAwsSecretAccessKey,
    credentialsAwsRegion,
    credentialsDoToken,
    credentialsDoRegion,
    ready,
    provisioning,
    error,
    url,
    ip,
    sshUser,
    privateKey,
    publicKey,
    kubeConfig,
  } = useProjectState();
  // define hooks
  const dispatch = useProjectDispatch();
  const navigate = useNavigate();

  // define handlers
  const handleSubmitForm = () => {
    // TODO(ca): implement a generict method for posting to api
    async function post(url: string, dataInput = {}) {
      dispatch({ type: ProjectActionKind.PROVISIONING });

      try {
        const response = await fetch(url, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataInput),
        });

        // if status not valid
        if (response.status !== 200) {
          const res = await response.json();
          if (res?.error !== "") {
            throw new Error(res.error);
          }

          throw new Error(response.statusText);
        }

        const res = await response.json();
        type Response = {
          url: string;
          ip: string;
          privateKey: string;
          publicKey: string;
          sshUser: string;
          kubeConfig: string;
        };

        const payload = {
          url: res.data.url,
          privateKey: res.data.privateKey,
          publicKey: res.data.publicKey,
          sshUser: res.data.sshUser,
          ip: res.data.ip,
          kubeConfig: res.data.kubeConfig,
        } as Response;

        dispatch({ type: ProjectActionKind.PROVISIONING_SUCCESS, payload });
      } catch (err: any) {
        dispatch({ type: ProjectActionKind.PROVISIONING_FAILURE, payload: { error: err } });
      }
    }

    // redirect to first step when error is unknow
    if (error && error.message && error.message.length > 0 && !Object.values(errors).includes(error.message)) {
      dispatch({ type: ProjectActionKind.CLEAR_ERROR });
      return navigate("/");
    } else if (error?.message) {
      dispatch({ type: ProjectActionKind.PROVISIONING_CLEAR });
      return navigate("/cloud-provider");
    }

    // case when request implement infrastructure
    if (!ready) {
      console.log("before", credentialsK8sConfig);
      post(`${REACT_APP_ONBOARDING_URL}/api/v1/projects`, {
        project: {
          name,
          password,
          environment,
          walletProvider,
          walletAddress,
          cloudProvider,
          credentialsK8sConfig,
          credentialsAwsAccessKeyId,
          credentialsAwsSecretAccessKey,
          credentialsAwsRegion,
          credentialsDoToken,
          credentialsDoRegion,
        } as ProjectState,
      });
    }
  };

  const handleDownload = () => {
    function newFile(name: string, data: string, extention: string) {
      const f = new Blob([data], { type: "text/plain" });
      const fileURL = URL.createObjectURL(f);
      const a = document.createElement("a");

      a.download = `dl_${name}.${extention}`;
      a.href = fileURL;
      a.click();
    }

    // download files
    if (cloudProvider === "aws" || cloudProvider === "azure" || cloudProvider === "do" || cloudProvider === "gcp") {
      newFile("info", `user: ${sshUser}\nip: ${ip}\nurl: ${url}\nport: 22`, "txt");
      newFile("private_key", privateKey, "pem");
      newFile("public_key", publicKey, "pem");
    }

    newFile("kube_config", kubeConfig, "yaml");
  };

  // effects

  // define elements to use in component
  // !provisioning && !ready
  let button = "Start";
  let description = (
    <Text>
      We are ready for provisioning the infrastructure in your cloud, click{" "}
      <Text as={"span"} color={"pink.400"}>
        start
      </Text>{" "}
      button!
    </Text>
  );

  if (error?.message === errors.INVALID_CREDENTIALS) {
    button = "Back";
    description = <Text>The entered credentials are not valid, go back to the previous step and correct that</Text>;
  } else if (error?.message === errors.INVALID_CREDENTIALS) {
    button = "Back";
    description = <Text>Error has occurred with Pulumi, check if the credential entered is correct</Text>;
  } else if (error?.message === errors.UNAUTHORIZED_PULUMI) {
    button = "Back";
    description = <Text>The credentials n't have the permissions required to mount the infrastructure</Text>;
  } else if (error && error.message && error.message.length > 0) {
    button = "Back";
    description = <Text>Error has occurred, please recheck the information entered</Text>;
  } else if (provisioning && !ready) {
    button = "Wait a few moment";
    description = <Text>We are now provisioning the infrastructure in your cloud, please wait a moment</Text>;
  } else if (!provisioning && ready) {
    button = "Lets go";
    description = (
      <Text>
        Your infrastructure is ready to be used. <Text>Enjoy.</Text>
      </Text>
    );
  }

  return (
    <OnBoardingBase title={"Provisioning"} description={description} accent={!!error}>
      <>
        <FormControl>
          <VStack pt={3} alignItems={"start"} width={"full"}>
            {provisioning && !ready ? (
              <Box display={"flex"} justifyContent={"center"} pb={5} w={"full"}>
                <CircularProgress isIndeterminate color="pink.400" size={"60px"} thickness={"4px"} />
              </Box>
            ) : null}

            {!provisioning && ready ? (
              <Box display={"flex"} justifyContent={"center"} w={"100%"} pb={3}>
                <Text
                  fontSize={"sm"}
                  color={"pink.400"}
                  onClick={handleDownload}
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  {/* <SaveFile data={credential}>Download SSH Credentials</SaveFile> */}
                  Download credentials
                </Text>
              </Box>
            ) : null}

            <Button
              onClick={handleSubmitForm}
              disabled={provisioning}
              width={"full"}
              bgColor={"pink.400"}
              fontWeight={"normal"}
              color={"white"}
              type="submit"
              size={"lg"}
            >
              {button}
            </Button>
          </VStack>
        </FormControl>
      </>
    </OnBoardingBase>
  );
}
