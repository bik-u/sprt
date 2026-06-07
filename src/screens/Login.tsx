import { useState, useContext } from "react";
import { LoginButton } from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { invoke } from "@tauri-apps/api/core";


export default function LoginScreen() {

    async function onLoginButtonClick() {
        
    }

    return (
        <>
            <LoginButton label="Login" onClick={onLoginButtonClick}>
            
            </LoginButton>
        </>
    )
} 