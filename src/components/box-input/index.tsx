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

    /*
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    */
  }
);

const BoxInput = (props: BoxProps) => (
  <StyledBox>
    {props.children}
  </StyledBox>
);

export default BoxInput;