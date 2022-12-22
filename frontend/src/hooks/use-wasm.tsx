import { useEffect, useState } from "react";
import { AsBind } from "as-bind";

export const useWasm = (filepath: string) => {
  const [state, setState] = useState(null); // the typed are be here

  useEffect(() => {
    const fetchWasm = async () => {
      const wasm = await fetch(filepath);
      const instance = await AsBind.instantiate(wasm, {});
      setState(instance);
    };

    fetchWasm();
  }, []);

  return state;
};
