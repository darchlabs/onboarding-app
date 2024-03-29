import { useContext } from "react";
import { ProjectState, StateContext, ProjectDispatch, DispatchContext } from "../providers";

export function useProjectState(): ProjectState {
  const ctx = useContext(StateContext);
  if (ctx === undefined) {
    throw new Error("state context is not defined");
  }

  return ctx;
}

export function useProjectDispatch(): ProjectDispatch {
  const ctx = useContext(DispatchContext);
  if (ctx === undefined) {
    throw new Error("actions context is not defined");
  }

  return ctx;
}
