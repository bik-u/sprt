import { useState } from "react"

interface InputProps {
    _disabled: boolean,
    value: string,
    onChange: (value: string)=> Promise<void>,
    className?: string,
    placeHolder?: string,
    inputType?: string
}

export function DefaultInput({_disabled, value, onChange, className, placeHolder, inputType} : InputProps) {

    async function _onChange(e: React.ChangeEvent<HTMLInputElement>) {
        await onChange(e.target.value)
    }

    return <input
        value={value}
        onChange={_onChange}
        disabled={_disabled}
        className={`bg-transparent outline-none min-h-13 min-w-100 border pl-10 pr-10 rounded-2xl border-zinc-700 focus:border-white hover:placeholder-white placeholder-zinc-500 font-mono text-white transition-colors ${className ?? ''}`}
        placeholder={placeHolder}
        type={inputType}
    ></input>

}