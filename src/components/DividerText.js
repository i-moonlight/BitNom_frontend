import React from "react";

export default function DividerText({ children }) {
  return (
    <p
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "1em 0",
      }}
    >
      <div
        style={{
          height: ".025em",
          background: "gray",
          flex: "1",
          margin: "0 .25em 0 0",
        }}
      ></div>
      {children}
      <div
        style={{
          height: ".025em",
          background: "gray",
          flex: "1",
          margin: "0 0 0 .25em",
        }}
      ></div>
    </p>
  );
}
