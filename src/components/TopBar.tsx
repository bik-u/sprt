import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minimize2, Maximize2, X } from "lucide-react";

export default function TopBar() {
  async function onTopBarMouseDown() {
    await getCurrentWindow().startDragging();
  }

  async function onMaximizeClicked() {
    await getCurrentWindow().maximize();
  }

  async function onMinimizeClicked() {
    await getCurrentWindow().minimize();
  }

  async function onCloseClicked() {
    await getCurrentWindow().close();
  }

  return (
    <div
      className="flex justify-end items-center h-[3%] gap-7 px-2 text-zinc-500 "
      onMouseDown={onTopBarMouseDown}
    >
      <Minimize2
        onClick={onMinimizeClicked}
        onMouseDown={(e) => e.stopPropagation()}
        size={20}
        className="hover:text-white"
      ></Minimize2>
      <Maximize2
        onClick={onMaximizeClicked}
        onMouseDown={(e) => e.stopPropagation()}
        size={20}
        className="hover:text-white"
      ></Maximize2>
      <X
        onClick={onCloseClicked}
        onMouseDown={(e) => e.stopPropagation()}
        size={20}
        className="hover:text-white"
      ></X>
    </div>
  );
}
