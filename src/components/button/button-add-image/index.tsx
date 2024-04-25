import React, { ComponentProps, ReactNode, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { stylesSheet } from "../styles";
import ButtonTouchable from "../button-touchable";
import { CameraIcon } from "../../icons";

type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  backgroundColor?: string;
  textColor?: string;
  cameraType?: ImagePicker.CameraType;
  onPress?: () => void;
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
      onPress={props.onPress}
      style={dynamicButtonStyles}  
    > 
      <CameraIcon/>
      {props.children}
    </ButtonTouchable>
  );
};

export default ButtonAddImage;
