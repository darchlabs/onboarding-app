import { ProjectAction, ProjectState, ProjectActionKind } from "./type";

export function onboardingReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case ProjectActionKind.SET_PASSWORD: {
      return {
        ...state,
        name: action.payload.password,
      };
    }
    case ProjectActionKind.SET_NAME: {
      return {
        ...state,
        name: action.payload.name,
      };
    }
    case ProjectActionKind.SET_ENVIRONMENT: {
      return {
        ...state,
        environment: action.payload.environment,
      };
    }
    case ProjectActionKind.SET_WALLET: {
      return {
        ...state,
        walletProvider: action.payload.provider,
        walletAddress: action.payload.address,
      };
    }
    case ProjectActionKind.SET_CLOUD_PROVIDER: {
      return {
        ...state,
        cloudProvider: action.payload.cloudProvider,
      };
    }
    case ProjectActionKind.SET_CLOUD_K8S: {
      return {
        ...state,
        credentialsK8sConfig: action.payload.config,
        provisioning: true,
      };
    }
    case ProjectActionKind.SET_CLOUD_AWS: {
      return {
        ...state,
        credentialsAwsAccessKeyId: action.payload.accessKeyId,
        credentialsAwsSecretAccessKey: action.payload.secretAccessKey,
        credentialsAwsRegion: action.payload.region,
        provisioning: true,
      };
    }
    case ProjectActionKind.SET_CLOUD_DO: {
      return {
        ...state,
        credentialsDoToken: action.payload.token,
        credentialsDoRegion: action.payload.region,
        provisioning: true,
      };
    }
    case ProjectActionKind.SET_READY: {
      return {
        ...state,
        provisioning: false,
        ready: true,
      };
    }
    default:
      return state;
  }
}
