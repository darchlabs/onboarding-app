import { ChakraProvider, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";

import {
  OnboardingAdminPassword,
  OnboardingName,
  OnboardingEnvironment,
  OnboardingWallet,
  OnboardingCloudProvider,
  OnboardingCredential,
  OnboardingProvisioning,
} from "./components/onboarding";

import { ProjectProvider } from "./providers/project";

const router = createBrowserRouter([
  {
    path: "/", // welcome and configure admin password
    element: <OnboardingAdminPassword />,
  },
  {
    path: "/project", // configure project name
    element: <OnboardingName />,
  },
  {
    path: "/environment", // configure environment
    element: <OnboardingEnvironment />,
  },
  {
    path: "/wallet", // configure wallet
    element: <OnboardingWallet />,
  },
  {
    path: "/cloud-provider", // configure provider
    element: <OnboardingCloudProvider />,
  },
  {
    path: "/credentials", // configure provider credentials
    element: <OnboardingCredential />,
  },
  {
    path: "/provisioning", // provisioning the infrastructure
    element: <OnboardingProvisioning />,
  },
]);

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ProjectProvider>
          <RouterProvider router={router}></RouterProvider>
        </ProjectProvider>
      </Layout>
    </ChakraProvider>
  );
};
