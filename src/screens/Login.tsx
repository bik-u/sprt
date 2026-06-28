import { useState, useContext } from "react";
import { Button } from "../components/Button";
import { DefaultInput } from "../components/Input";
import { Eye, EyeClosed } from "lucide-react";


export default function LoginScreen() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isPassVisible, setisPassVisible] = useState(false)


    async function onUsernameChanged(value: string) {
        setUsername(value)
    }

    async function onPasswordChanged(value: string) {
        setPassword(value)
    }

    async function onLoginClicked() {
        
    }

    async function togglePassVisible() {
        setisPassVisible(!isPassVisible)
    }

    return (
        <div className="grid h-full ">
            <div className="flex flex-col items-center justify-center gap-10">
                <pre className="text-zinc-500 font-mono text-center text-9xl">
                </pre>
                <div className="flex flex-col items-center gap-3"> 
                <DefaultInput  _disabled={false} value={username} onChange={onUsernameChanged} placeHolder="Email"></DefaultInput>
                <DefaultInput  _disabled={false} value={password} onChange={onPasswordChanged} placeHolder="Password" inputType={isPassVisible ? "text": "password"}></DefaultInput>
                <div className="flex items-center gap-3">
                    <Button label="Login" onClick={onLoginClicked}></Button>
                    <div className="text-zinc-500 hover:text-white">
                        {!isPassVisible ? <EyeClosed onClick={togglePassVisible}></EyeClosed> : <Eye onClick={togglePassVisible}></Eye>}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
} 