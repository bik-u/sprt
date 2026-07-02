import { useState, useEffect, useContext } from "react";
import { Button } from "../components/Button";
import { DefaultInput } from "../components/Input";
import { Eye, EyeClosed, X } from "lucide-react";
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

  async function onContinueClicked() {
    onLoginSuccess();
  }

  useEffect(() => {
    if (!loginFailed) return;

    const timer = setTimeout(() => {
      setLoginFailed(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loginFailed]);

  return (
    <div className="flex justify-center h-full gap-30">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-white font-normal text-center underline underline-offset-4 decoration-1 decoration-purple-700">
          <span className="text-4xl icon-glow block">
            Extract addons from stremio
          </span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <DefaultInput
            _disabled={isLoading}
            value={username}
            onChange={onUsernameChanged}
            placeHolder="Email"
          ></DefaultInput>
          <div className="relative">
            <DefaultInput
              _disabled={isLoading}
              value={password}
              onChange={onPasswordChanged}
              placeHolder="Password"
              inputType={isPassVisible ? "text" : "password"}
            ></DefaultInput>
            <div className="absolute right-3 top-1/4 text-zinc-100 hover:text-white">
              {!isPassVisible ? (
                <EyeClosed onClick={togglePassVisible}></EyeClosed>
              ) : (
                <Eye onClick={togglePassVisible}></Eye>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button label="Login" onClick={onLoginClicked}></Button>
          </div>
        </div>
      </div>

      <div />
      <div className="flex flex-col justify-center h-full gap-10 ">
        <div className="text-white font-normal text-center border-l border-zinc-500 hover:border-white">
          <span className="text-4xl icon-glow block">Or</span>
        </div>
        <Button label="Continue" onClick={onContinueClicked}></Button>
      </div>
      {isLoading ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-oled-dark" />
      ) : null}
      {loginFailed ? (
        <div className="flex fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md text-xl text-red-300">
          Stremio login failed :(
        </div>
      ) : null}
    </div>
  );
}
