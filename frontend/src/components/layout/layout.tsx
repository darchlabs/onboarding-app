import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: JSX.Element | string }) {
  return (
    <Box display={"flex"} minH="100vh" bgColor={"#E1E3E6"} justifyContent={"center"} alignItems={"center"}>
      {children}
    </Box>
  );
}
