import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

export default function TextField({ children, ...props }) {
  return (
    <MuiTextField
      style={{
        marginBottom: 16,
      }}
      {...props}
    >
      {children}
    </MuiTextField>
  );
}
