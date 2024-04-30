import { styled, Box as GLBox } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";
import { StyleSheet } from "react-native";

interface BoxProps {
  children: ReactNode;
  w?: number;
  mt?: number;
  mb?: number;
  bc?: string;
  bw?: number;
}

const boxStyles = StyleSheet.create({
  box: {
    width: '90%',
    marginTop: 0, 
    marginBottom: 0,
    borderColor: colors.gray,
    borderWidth: 0,
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
  };

  return (
    <StyledBox style={dynamicStyles}>
      {props.children}
    </StyledBox>
  );
};

export default Box;