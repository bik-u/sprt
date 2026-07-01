import { useState } from "react";

interface ButtonProps {
  label: string;
  onClick: () => Promise<void>;
  className?: string;
}

export function Button({ label, onClick, className }: ButtonProps) {
  const [loading, setLoading] = useState(false);

  async function hasClicked() {
    setLoading(true);
    await onClick();
    setLoading(false);
  }

  return (
    <button
      className={
        className == null
          ? "text-center px-4 py-2 min-w-80 min-h-13 outline-nonez border rounded-4xl border-zinc-700 focus:border-white hover:text-zinc-300 hover:bg-zinc-900 font-mono text-white transition-colors"
          : className
      }
      onClick={hasClicked}
    >
      {label}
    </button>
  );
}
