import { useState, useContext, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

import Output from "./screens/Output";
import TopBar from "./components/TopBar";

type ApiErrorKind = {
  kind: "unauthorized";
  message: String;
};

async function invoke_get_has_key(): Promise<boolean> {
  try {
    return await invoke<boolean>("get_has_auth_key_and_check_if_valid");
  } catch (e) {
    const error = e as ApiErrorKind;
    if (error.kind === "unauthorized") return false;
    throw e;
  }
}

function App() {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    //invoke_get_has_key().then(result => setHasKey(result));
  }, []);

  return (
    <div className="flex h-screen flex-col divide-y-4 bg-oled-dark">
      <TopBar></TopBar>
      <div className="flex flex-1 divide-x-4">
        <div className="w-[3%] min-w-10">
          <p className="text-white"> navbar section</p>
        </div>
        <div className="flex flex-1 flex-col divide-y-4">
          <div className="flex-1 overflow-auto">
            <p className="text-white">main section</p>
          </div>
          <Output></Output>
        </div>
      </div>
    </div>
  );
}

export default App;
