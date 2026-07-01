import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { DefaultInput } from "../components/Input";
import { Eye, EyeClosed } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";

interface LoginProps {
  onLoginSuccess: () => void;
}

async function invoke_login(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    return await invoke<boolean>("login_and_populate", {
      email: username,
      password: password,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default function LoginScreen({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setisPassVisible] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onUsernameChanged(value: string) {
    setUsername(value);
  }

  async function onPasswordChanged(value: string) {
    setPassword(value);
  }

  async function onLoginClicked() {
    setIsLoading(true);
    setLoginFailed(false);
    if (await invoke_login(username, password)) {
      onLoginSuccess();
    } else {
      setLoginFailed(true);
    }
    setIsLoading(false);
  }

  async function togglePassVisible() {
    setisPassVisible(!isPassVisible);
  }

  return (
    <div className="grid h-full ">
      <div className="flex items-center justify-center gap-10">
        <pre className="text-white font-mono text-center text-xl">
          <pre className="text-4xl icon-glow"> Stremio Tauri + Addons </pre>
        </pre>
        <div className="flex flex-col items-center gap-3">
          <DefaultInput
            _disabled={isLoading}
            value={username}
            onChange={onUsernameChanged}
            placeHolder="E-mail"
          ></DefaultInput>
          <DefaultInput
            _disabled={isLoading}
            value={password}
            onChange={onPasswordChanged}
            placeHolder="Password"
            inputType={isPassVisible ? "text" : "password"}
          ></DefaultInput>
          <div className="flex items-center gap-3">
            <Button label="Login" onClick={onLoginClicked}></Button>
            <div className="text-zinc-100 hover:text-white">
              {!isPassVisible ? (
                <EyeClosed onClick={togglePassVisible}></EyeClosed>
              ) : (
                <Eye onClick={togglePassVisible}></Eye>
              )}
            </div>
          </div>
          {loginFailed ? (
            <div className="flex text-red-600 min-w-50">
              Stremio login failed
            </div>
          ) : null}
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
