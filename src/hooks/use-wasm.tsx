import { useEffect, useState } from "react";

declare const Go: any;

// if (!WebAssembly.instantiateStreaming) { // polyfill
//   WebAssembly.instantiateStreaming = async (resp, importObject) => {
//     const source = await (await resp).arrayBuffer();
//     return await WebAssembly.instantiate(source, importObject);
//   };
// }

export const useWasm = (filepath: string) => {
  const [state, setState] = useState({} as WebAssembly.WebAssemblyInstantiatedSource);

  console.log("BEFORE ONCE 1111");

  useEffect(() => {
    const fetchWasm = async () => {
      console.log("BEFORE");

      try {
        const wasm = await fetch(`./${filepath}.wasm`);
        if (!wasm.ok) {
          throw new Error(`Failed to fetch resource ${filepath}.`);
        }

        // prepare intance for wasm
        const go = new Go();
        const bytes = await wasm.arrayBuffer();
        const module = await WebAssembly.instantiate(bytes, go.importObject);
        await go.run(module.instance);

        // set state with instance
        setState(module);

        console.log("AFTER", module);
      } catch (err) {
        console.log("here in catch wasm error", err);
        throw err;
      }
    };

    fetchWasm();
  }, []);

  return state;
};
