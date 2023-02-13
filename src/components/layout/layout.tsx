import { Box, Button } from "@chakra-ui/react";
import { useProjectDispatch } from "../../hooks/use-project";
import { ProjectActionKind } from "../../providers";

export default function Layout({ children }: { children: JSX.Element | string }) {
  const dispatch = useProjectDispatch();

  function handleClick() {
    dispatch({ type: ProjectActionKind.CLEAR });
  }

  return (
    <Box display={"flex"} minH="100vh" bgColor={"#E1E3E6"} justifyContent={"center"} alignItems={"center"}>
      {children}
      <Button onClick={handleClick} position={"absolute"} right={"3%"} bottom={"2%"}>
        ❌
      </Button>
    </Box>
  );
}
