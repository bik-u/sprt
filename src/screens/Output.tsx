import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Output() {
  return (
    <div className="h-[30%] overflow-auto">
      <p className="text-white">output section</p>
    </div>
  );
}
