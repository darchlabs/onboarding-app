import { useState, useEffect } from "react";
import { useProjectState, useProjectDispatch } from "../../../hooks/use-project";
import { Text, VStack, Button, InputGroup, Input, InputRightElement, IconButton, Select } from "@chakra-ui/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { DO, DORegions, ProjectActionKind, DOCredential } from "../../../providers";

export function CredentialDO(): JSX.Element {
  // define hooks
  const navigate = useNavigate();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { credentialsDoToken: credentialsDoTokenState, credentialsDoRegion: credentialsDoRegionState } =
    useProjectState();

  const [DOCredential, setDOCredential] = useState({
    token: credentialsDoTokenState,
    region: credentialsDoRegionState,
  } as DOCredential);

  const [show, setShow] = useState({
    token: false,
  } as { [key in DO]: boolean });

  // define effects
  useEffect(() => setReady(DOCredential.token?.length && DOCredential.region?.length ? true : false), [DOCredential]);

  // define handlers
  const handleChange = (key: DO, { target: { value } }: any) => setDOCredential({ ...DOCredential, [key]: value });
  const handleClickShow = (key: DO) => setShow({ ...show, [key]: !show[key] });
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save password on project provider context
    dispatch({
      type: ProjectActionKind.SET_CLOUD_DO,
      payload: {
        token: DOCredential.token,
        region: DOCredential.region,
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
        Token
      </Text>
      <InputGroup pb={2} size="lg" borderColor={"gray.100"}>
        <Input
          pr={20}
          type={show["token"] ? "text" : "password"}
          placeholder="Token"
          bgColor={"gray.50"}
          color="gray.500"
          fontWeight={"normal"}
          fontSize={"md"}
          onChange={(ev) => handleChange("token", ev)}
          value={DOCredential.token}
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
            onClick={() => handleClickShow("token")}
            color="gray.500"
            icon={show["token"] ? <BsEyeSlash /> : <BsEye />}
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
          fontSize={"md"}
          value={DOCredential.region}
          _focusVisible={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "pink.400",
          }}
        >
          {DORegions.map((region, index: number) => (
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
