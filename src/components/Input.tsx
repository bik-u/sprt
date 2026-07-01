interface InputProps {
  _disabled: boolean;
  value: string;
  onChange: (value: string) => Promise<void>;
  className?: string;
  placeHolder?: string;
  inputType?: string;
}

export function DefaultInput({
  _disabled,
  value,
  onChange,
  className,
  placeHolder,
  inputType,
}: InputProps) {
  async function _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    await onChange(e.target.value);
  }

  return (
    <input
      value={value}
      onChange={_onChange}
      disabled={_disabled}
      className={`outline-none bg-transparent min-h-13 min-w-100 border pl-10 pr-10 rounded border-transparent hover:bg-zinc-900 placeholder-white font-mono text-white transition-colors ${className ?? ""}`}
      placeholder={placeHolder}
      type={inputType}
    ></input>
  );
}
