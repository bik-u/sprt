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
          ? "text-center bg-transparent px-4 py-2 min-w-50 min-h-13 outline-nonez border rounded-2xl border-zinc-700 focus:border-white hover:text-white  placeholder-zinc-500 font-mono text-zinc-500 transition-colors"
          : className
      }
      onClick={hasClicked}
    >
      {label}
    </button>
  );
}
