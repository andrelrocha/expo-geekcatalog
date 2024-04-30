import { styled, Box as GLBox } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";
import { StyleSheet, ViewStyle } from "react-native";

interface BoxProps {
  children: ReactNode;
  w?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  bw?: number;
  bc?: string;
  alignItems?: string;
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
  };

  return (
    <StyledBox style={[dynamicStyles as ViewStyle]}>
      {props.children}
    </StyledBox>
  );
};

export default Box;