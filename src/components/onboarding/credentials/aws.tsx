import { useState, useEffect } from "react";
import { useProjectState, useProjectDispatch } from "../../../hooks/use-project";
import { Text, VStack, Button, InputGroup, Input, InputRightElement, IconButton, Select } from "@chakra-ui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AWS, AWSRegions, AWSCredential, ProjectActionKind } from "../../../providers";

export function CredentialAWS(): JSX.Element {
  // define hooks
  const navigate = useNavigate();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    credentialsAwsAccessKeyId: accessKeyIdState,
    credentialsAwsSecretAccessKey: secretAccessKeyState,
    credentialsAwsRegion: regionState,
  } = useProjectState();

  const [AWSCredential, setAWSCredential] = useState({
    accessKeyId: accessKeyIdState,
    secretAccessKey: secretAccessKeyState,
    region: regionState,
  } as AWSCredential);

  const [show, setShow] = useState({
    accessKeyId: false,
    secretAccessKey: false,
  } as { [key in AWS]: boolean });

  // define effects
  useEffect(
    () =>
      setReady(
        AWSCredential.accessKeyId?.length && AWSCredential.secretAccessKey?.length && AWSCredential.region?.length
          ? true
          : false
      ),
    [AWSCredential]
  );

  // define handlers
  const handleChange = (key: AWS, { target: { value } }: any) => setAWSCredential({ ...AWSCredential, [key]: value });
  const handleClickShow = (key: AWS) => setShow({ ...show, [key]: !show[key] });
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save password on project provider context
    dispatch({
      type: ProjectActionKind.SET_CLOUD_AWS,
      payload: {
        accessKeyId: AWSCredential.accessKeyId,
        secretAccessKey: AWSCredential.secretAccessKey,
        region: AWSCredential.region,
      },
    });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/provisioning");
    }, 500);
  };

  return (
    <VStack pt={5} alignItems={"start"} width={"full"}>
      <Text mb={1} textTransform={"uppercase"} color={"gray.400"} fontSize={"xs"} fontWeight={"bold"}>
        aws access key id
      </Text>
      <InputGroup pb={2} size="lg" borderColor={"gray.100"}>
        <Input
          pr={20}
          type={show["accessKeyId"] ? "text" : "password"}
          placeholder="Access Key Id"
          bgColor={"gray.50"}
          color="gray.500"
          fontWeight={"normal"}
          fontSize={"md"}
          onChange={(ev) => handleChange("accessKeyId", ev)}
          value={AWSCredential.accessKeyId}
          _placeholder={{
            color: "gray.400",
            fontWeight: "light",
            fontSize: "md",
          }}
          _focusVisible={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "pink.400",
          }}
        />
        <InputRightElement>
          <IconButton
            aria-label="Show or hide password input button"
            variant={"unstyled"}
            onClick={() => handleClickShow("accessKeyId")}
            color="gray.500"
            icon={show["accessKeyId"] ? <BsEyeSlash /> : <BsEye />}
            size="lg"
          />
        </InputRightElement>
      </InputGroup>

      <Text mb={1} textTransform={"uppercase"} color={"gray.400"} fontSize={"xs"} fontWeight={"bold"}>
        aws secret access key
      </Text>
      <InputGroup pb={2} size="lg" borderColor={"gray.100"}>
        <Input
          pr={20}
          type={show["secretAccessKey"] ? "text" : "password"}
          placeholder="Secret Access Key"
          bgColor={"gray.50"}
          color="gray.500"
          fontWeight={"normal"}
          fontSize={"md"}
          onChange={(ev) => handleChange("secretAccessKey", ev)}
          value={AWSCredential.secretAccessKey}
          _placeholder={{
            color: "gray.400",
            fontWeight: "light",
            fontSize: "md",
          }}
          _focusVisible={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "pink.400",
          }}
        />
        <InputRightElement>
          <IconButton
            aria-label="Show or hide password input button"
            variant={"unstyled"}
            onClick={() => handleClickShow("secretAccessKey")}
            color="gray.500"
            icon={show["secretAccessKey"] ? <BsEyeSlash /> : <BsEye />}
            size="lg"
          />
        </InputRightElement>
      </InputGroup>
      <InputGroup flexDir={"column"} pb={5} size="lg">
        <Text mb={1} textTransform={"uppercase"} color={"gray.400"} fontSize={"xs"} fontWeight={"bold"}>
          Region
        </Text>
        <Select
          placeholder="Region"
          bgColor={"gray.50"}
          color="gray.400"
          fontWeight={"light"}
          borderColor={"gray.100"}
          onChange={(ev) => handleChange("region", ev)}
          value={AWSCredential.region}
          fontSize={"md"}
          _focusVisible={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "pink.400",
          }}
        >
          {AWSRegions.map((region, index: number) => (
            <option key={index} value={region.slug}>
              {region.name}
            </option>
          ))}
        </Select>
      </InputGroup>

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
  );
}
