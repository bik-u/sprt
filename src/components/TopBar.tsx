import { getCurrentWindow } from "@tauri-apps/api/window";

export default function TopBar() {
  return (
    <div className="h-[1%] min-h-8">
      <p className="text-white">topbar</p>
    </div>
  );
}
