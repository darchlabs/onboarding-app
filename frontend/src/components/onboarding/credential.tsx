import OnBoardingBase from "./base";
import { useProjectState } from "../../hooks/use-project";
import { CloudProvider } from "../../providers/project";
import { CredentialAWS, CredentialDO } from "./credentials";

export function OnboardingCredential() {
  // define hooks
  const { cloudProvider } = useProjectState();

  function GetCloudProviderCredentials(cp: CloudProvider): JSX.Element {
    switch (cp) {
      case "aws":
        return <CredentialAWS />;
      case "do":
        return <CredentialDO />;
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
