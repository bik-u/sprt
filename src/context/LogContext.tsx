import { createContext } from "react";

export type LogType = "loading" | "error" | "warning";

interface LogContextType {
  logs: Array<LogType>;

  addAuth: (log: LogType) => void;
}

export const LogContext = createContext<LogContextType | null>(null);
