import { createContext, useReducer, useEffect } from "react";
import { onboardingReducer } from "./reducer";
import { CloudProvider, Environment, ProjectDispatch, ProjectProviderProps, ProjectState } from "./type";

// define initial state
const initialState: ProjectState = {
  name: "",
  password: "",
  environment: "" as Environment,
  walletProvider: undefined,
  walletAddress: undefined,
  cloudProvider: "" as CloudProvider,
  credentialsK8sConfig: undefined,
  credentialsAwsAccessKeyId: undefined,
  credentialsAwsSecretAccessKey: undefined,
  credentialsAwsRegion: undefined,
  credentialsDoToken: undefined,
  credentialsDoRegion: undefined,
  provisioning: false,
  ready: false,
};

// read from local storage or return default initial storage
function getInitialState() {
  const state = localStorage.getItem("state");
  return state ? JSON.parse(state) : initialState;
}

// define contexts
export const StateContext = createContext<ProjectState>({} as ProjectState);
export const DispatchContext = createContext<ProjectDispatch>({} as ProjectDispatch);

// define provider
export function ProjectProvider({ children }: ProjectProviderProps) {
  // get values from reducer
  const [state, dispatch] = useReducer(onboardingReducer, getInitialState());

  // listen to changes in state and save in local storage
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  // providers with dispatchers and states
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
