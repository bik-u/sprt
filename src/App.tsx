import { useState, useContext, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

type ApiErrorKind = {
  kind: 'unauthorized',
  message: String
}

async function invoke_get_has_key(): Promise<boolean> {
  try {
    return await invoke<boolean>('get_has_auth_key_and_check_if_valid');
  } catch (e) {
    const error = e as ApiErrorKind;
    if (error.kind === 'unauthorized') return false;
    throw e; 
  }
}

function App() {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    invoke_get_has_key().then(result => setHasKey(result));
  }, []);

  return (
    <main className="container">

    </main>
  );
}

export default App;
