import { styled, Heading  as GLHeading } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";
import { StyleSheet, ViewStyle } from "react-native";

interface HeadingProps {
  children: ReactNode
  mt?: number
  mb?: number
  fs?: number
  color?: string
  textAlign?: string
  w?: number
}

const headingStyles = StyleSheet.create({
  heading: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 0,
    color: colors.black,
    marginTop: 0,
    width: '100%',
  }
});

const StyledHeading = styled(
  GLHeading,
  {
    ...headingStyles.heading,
  }
);

const Heading = (props: HeadingProps) => {
    const dynamicHeadingStyles = {
      marginTop: props.mt || headingStyles.heading.marginTop,
      marginBottom: props.mb || headingStyles.heading.marginBottom,
      fontSize: props.fs || headingStyles.heading.fontSize,
      color: props.color || headingStyles.heading.color,
      textAlign: props.textAlign || headingStyles.heading.textAlign,
      width: props.w || headingStyles.heading.width
    };

    return (
      <StyledHeading style={dynamicHeadingStyles as ViewStyle}>
          {props.children}
      </StyledHeading>
    );
};

export default Heading;