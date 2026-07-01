import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Main from "./screens/Main";
import LoginScreen from "./screens/Login";

type ApiErrorKind = {
  kind: "stremioServerError";
  message: String;
};

async function invoke_get_has_key(): Promise<boolean> {
  try {
    return await invoke<boolean>("get_has_auth_key_and_check_valid");
  } catch (e) {
    console.log(e);
    return false;
  }
}

function App() {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    invoke_get_has_key().then((result) => {
      setHasKey(result);
      invoke("show_window");
    });
  }, []);

  return (
    <div className="flex h-screen flex-col animated-bg divide-y divide-border-grey select-none">
      <TopBar></TopBar>
      <div className="flex flex-1 divide-x divide-border-grey">
        {hasKey ? <NavBar size={"small"}></NavBar> : null}
        <div className="flex flex-1 flex-col divide-y divide-border-grey">
          {hasKey ? (
            <Main></Main>
          ) : (
            <LoginScreen onLoginSuccess={() => setHasKey(true)}></LoginScreen>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
