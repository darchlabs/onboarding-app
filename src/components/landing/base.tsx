import { VStack } from "@chakra-ui/react";
import { Navbar } from "../navbar";

export function Base({ children }: { children: JSX.Element[] }): JSX.Element {
  return (
    <VStack spacing={0} w={"full"} h={"100vh"}>
      <Navbar></Navbar>
      {children}
    </VStack>
  );
}
