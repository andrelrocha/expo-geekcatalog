import { styled, Box  as GLBox } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";

interface BoxProps {
  children: ReactNode
}

const StyledBox = styled(
  GLBox,
  {
    width: '90%',
    marginTop: 0, 
    borderColor: colors.gray,
  }
);

const BoxInput = (props: BoxProps) => (
  <StyledBox>
    {props.children}
  </StyledBox>
);

export default BoxInput;