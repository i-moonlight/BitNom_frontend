import React from "react";
import NavBar from "./NavBar";

export default function Screen({ children }) {
  return (
    <div>
      <NavBar />
      <div style={{ height: 160 }}></div>
      {children}
    </div>
  );
}
