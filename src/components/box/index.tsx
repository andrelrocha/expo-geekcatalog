import { styled, Box as GLBox } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";
import { StyleSheet, ViewStyle } from "react-native";

interface BoxProps {
  children: ReactNode;
  w?: number;
  h?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  bw?: number;
  bc?: string;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  display?: 'flex' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: number;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  style?: ViewStyle;
}

const boxStyles = StyleSheet.create({
  box: {
    width: '90%',
    marginTop: 0, 
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderColor: colors.gray,
    borderWidth: 0,
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    justifyContent: 'center',
    height: 'auto',
  }
});

const StyledBox = styled(
  GLBox,
  {
    ...boxStyles.box,
  }
);

const Box = (props: BoxProps) => {
  const dynamicStyles = {
    width: props.w || boxStyles.box.width,
    marginTop: props.mt || boxStyles.box.marginTop,
    marginBottom: props.mb || boxStyles.box.marginBottom,
    borderColor: props.bc || boxStyles.box.borderColor,
    borderWidth: props.bw || boxStyles.box.borderWidth,
    marginLeft: props.ml || boxStyles.box.marginLeft,
    marginRight: props.mr || boxStyles.box.marginRight,
    alignItems: props.alignItems || boxStyles.box.alignItems,
    display: props.display || boxStyles.box.display,
    flexDirection: props.flexDirection || boxStyles.box.flexDirection,
    gap: props.gap || boxStyles.box.gap,
    justifyContent: props.justifyContent || boxStyles.box.justifyContent,
    height: props.h || boxStyles.box.height,
  };

  return (
    <StyledBox style={{...dynamicStyles, ...props.style}}>
      {props.children}
    </StyledBox>
  );
};

export default Box;