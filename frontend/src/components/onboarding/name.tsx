import React from "react";
import OnBoardingBase from "./base";
import { Text, FormControl, VStack, Input, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useProjectDispatch } from "../../hooks/use-project";
import { ProjectActionKind } from "../../providers";

export function OnboardingName() {
  // define hooks
  const [ready, setReady] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const dispatch = useProjectDispatch();
  const navigate = useNavigate();

  // define handlers
  const handleProjectName = ({ target: { value } }: any) => setName(value);
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save name on project provider context
    dispatch({ type: ProjectActionKind.SET_NAME, payload: { name } });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/environment");
    }, 500);
  };

  // define effects
  React.useEffect(() => setReady(name.length ? true : false), [name]);

  return (
    <OnBoardingBase title={"Project"} description={<Text>Now we must configure your first project</Text>}>
      <FormControl>
        <VStack pt={5} alignItems={"start"} width={"full"}>
          <Text mb={1} textTransform={"uppercase"} color={"gray.400"} fontSize={"xs"} fontWeight={"bold"}>
            Project Name
          </Text>

          <Box pb={5} w={"full"}>
            <Input
              size="lg"
              borderColor={"gray.100"}
              pr={20}
              type={"text"}
              placeholder="Project Name"
              bgColor={"gray.50"}
              color="gray.500"
              fontWeight={"normal"}
              fontSize={"md"}
              onChange={(ev) => handleProjectName(ev)}
              _placeholder={{
                color: "gray.500",
                opacity: 0.4,
                fontWeight: "light",
                fontSize: "md",
              }}
              _focusVisible={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "pink.400",
              }}
            />
          </Box>

          <Button
            onClick={handleSubmitForm}
            disabled={!ready}
            isLoading={isSubmitting}
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
