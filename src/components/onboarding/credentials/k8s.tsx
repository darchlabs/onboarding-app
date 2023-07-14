import { useState, useEffect } from "react";
import { useProjectState, useProjectDispatch } from "../../../hooks/use-project";
import { Text, VStack, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { K8SCredential, ProjectActionKind } from "../../../providers";
import Editor, { useMonaco } from "@monaco-editor/react";
import { load, JSON_SCHEMA } from "js-yaml";

export function CredentialK8s(): JSX.Element {
  // define hooks
  const navigate = useNavigate();
  const monaco = useMonaco();
  const dispatch = useProjectDispatch();
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { credentialsK8sConfig: k8sConfigState } = useProjectState();

  const [k8sCredential, setK8sCredential] = useState({
    config: k8sConfigState,
  } as K8SCredential);

  // define effects
  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  // define handlers
  const handleChange = (yml: any) => setK8sCredential({ config: yml });
  const handleSubmitForm = () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    // save password on project provider context
    dispatch({
      type: ProjectActionKind.SET_CLOUD_K8S,
      payload: {
        config: k8sCredential.config,
      },
    });

    // fake waiting
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/provisioning");
    }, 500);
  };

  // define effects
  useEffect(() => {
    try {
      type KubeConfigType = {
        apiVersion: string;
        clusters: {
          cluster: {
            "certificate-authority-data": string;
            server: string;
          };
          name: string;
        }[];
        contexts: {
          context: {
            cluster: string;
            user: string;
          };
          name: string;
        }[];
        "current-context": string;
        kind: string;
        preferences: {}; // not required
        users: {
          name: string;
          user: {
            "client-certificate-data": string;
            "client-key-data": string;
          };
        }[];
      };

      // initialize yml
      const config = load(k8sCredential.config, { schema: JSON_SCHEMA }) as KubeConfigType;

      // check if kubeconfig are defined
      if (!config) {
        setReady(false);
      }

      // check existence of apiVersion key
      if (!config?.apiVersion || config.apiVersion === "") {
        return setReady(false);
      }

      // check existence of current-context key
      if (!config["current-context"] || config["current-context"] === "") {
        return setReady(false);
      }

      // check existence of kind key
      if (!config["kind"] || config["kind"] === "") {
        return setReady(false);
      }

      // check existence of clusters key
      if (!config.clusters || !Array.isArray(config.clusters)) {
        return setReady(false);
      }
      const [cluster] = config.clusters;

      // check cluster object key
      if (!cluster || !cluster.name || cluster.name === "" || !cluster.cluster) {
        return setReady(false);
      }

      // check certificate-authority-data cluster key
      if (!cluster.cluster["certificate-authority-data"] || cluster.cluster["certificate-authority-data"] === "") {
        return setReady(false);
      }

      // check server cluster key
      if (!cluster.cluster.server || cluster.cluster.server === "") {
        return setReady(false);
      }

      // check existence of contexts key
      if (!config.contexts || !Array.isArray(config.contexts) || !config.contexts) {
        return setReady(false);
      }
      const [context] = config.contexts;

      // check context key
      if (!context || !context.name || context.name === "") {
        return setReady(false);
      }

      // check cluster context key
      if (!context.context.cluster || context.context.cluster === "") {
        return setReady(false);
      }

      // check user context key
      if (!context.context.user || context.context.user === "") {
        return setReady(false);
      }

      // check existence of users key
      if (!config.users || !Array.isArray(config.users) || !config.users) {
        return setReady(false);
      }
      const [user] = config.users;

      // check cluste object key
      if (!user || !user.name || user.name === "" || !user.user) {
        return setReady(false);
      }

      // check client-certificate-data user key
      if (!user.user["client-certificate-data"] || user.user["client-certificate-data"] === "") {
        return setReady(false);
      }

      // check client-key-data user key
      if (!user.user["client-key-data"] || user.user["client-key-data"] === "") {
        return setReady(false);
      }

      setReady(true);
    } catch (err: any) {
      setReady(false);
    }
  }, [k8sCredential]);

  return (
    <VStack pt={5} alignItems={"start"} width={"full"}>
      <Text mb={1} textTransform={"uppercase"} color={"gray.400"} fontSize={"xs"} fontWeight={"bold"}>
        Insert Kubeconfig
      </Text>

      <Box pb={4}>
        <Editor
          onChange={handleChange}
          width={"600px"}
          height={"200px"} // default: 90vh
          options={{
            minimap: {
              enabled: false,
            },
          }}
          defaultLanguage="yaml"
          defaultValue={!k8sCredential.config ? "// insert your kubeconfig here" : k8sCredential.config}
        />
      </Box>

      <Button
        onClick={handleSubmitForm}
        isLoading={isSubmitting}
        disabled={!ready}
        width={"full"}
        bgColor={"pink.400"}
        fontWeight={"normal"}
        color={"white"}
        type="submit"
        size={"lg"}
      >
        Continue
      </Button>
    </VStack>
  );
}
