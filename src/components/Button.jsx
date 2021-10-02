import { Button as MuiButton } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import logo_google from "../assets/components/google.svg";

export default function Button({
  textCase,
  color,
  colorAlt,
  submit,
  onClick,
  variant,
  variantAlt,
  google,
  children,
  ...props
}) {
  const formikContext = useFormikContext();

  const buttonVariant = variantAlt ? variantAlt : variant;
  const buttonColor = colorAlt ? colorAlt : color;

  return (
    <MuiButton
      color={buttonColor ? buttonColor : "primary"}
      variant={buttonVariant ? buttonVariant : "contained"}
      disableElevation={!google}
      style={{
        backgroundColor: google && "#f2f2f2",
        color: !buttonColor && google && "#818181",
        textTransform: textCase && "none",
      }}
      onClick={submit ? formikContext.handleSubmit : onClick}
      {...props}
    >
      {google && (
        <img src={logo_google} alt="" style={{ width: 20, marginRight: 16 }} />
      )}
      {children}
    </MuiButton>
  );
}
