import React, { ComponentProps, ReactNode } from "react";
import { stylesSheet } from "../styles";
import ButtonTouchable from "../button-touchable";
import { CameraIcon } from "../../icons";

type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  backgroundColor?: string;
  textColor?: string;
} & ComponentProps<typeof ButtonTouchable>;

const ButtonAddImage = (props: ButtonProps) => {
  const dynamicButtonStyles = {
    backgroundColor: props.backgroundColor || stylesSheet.buttonImage.backgroundColor,
    color: props.textColor || stylesSheet.buttonText.color,
    ...stylesSheet.buttonImage,
  };

  return (
    <ButtonTouchable
      {...props}
      style={dynamicButtonStyles}  
    > 
      <CameraIcon/>
      {props.children}
    </ButtonTouchable>
  );
};

export default ButtonAddImage;
