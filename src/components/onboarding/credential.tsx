import OnBoardingBase from "./base";
import { useProjectState } from "../../hooks/use-project";
import { CloudProvider } from "../../providers/project";
import { CredentialAWS, CredentialDO, CredentialK8s } from "./credentials";

export function OnboardingCredential() {
  // define hooks
  const { cloudProvider } = useProjectState();

  function GetCloudProviderCredentials(cp: CloudProvider): JSX.Element {
    switch (cp) {
      case "aws":
        return <CredentialAWS />;
      case "do":
        return <CredentialDO />;
      case "k8s":
        return <CredentialK8s />;
      default:
    }

    return <></>;
  }

  // component
  return (
    <OnBoardingBase
      title={"Cloud Provider"}
      description={"Finish you need to insert the credentials of the cloud provider"}
    >
      {GetCloudProviderCredentials(cloudProvider)}
    </OnBoardingBase>
  );
}
