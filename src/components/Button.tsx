import { useState } from "react"

interface ButtonProps {
    label: string,
    onClick: () => Promise<void>
}

export function LoginButton({label, onClick}: ButtonProps) {
    const [loading, setLoading] = useState(false);

    async function hasClicked() {
        setLoading(true)
        await onClick()
        setLoading(false)
    }

    return (
        <button
            onClick={hasClicked}>
            {label}
        </button>

    )
}