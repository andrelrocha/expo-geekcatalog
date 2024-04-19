import { styled, Heading  as GLHeading } from "@gluestack-ui/themed"
import { ReactNode } from "react";
import { colors } from "../../utils/colors";

interface HeadingProps {
  children: ReactNode
}

const StyledHeading = styled(
  GLHeading,
  {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
    marginTop: 0
  }
);

const Heading = (props: HeadingProps) => (
    <StyledHeading>
        {props.children}
    </StyledHeading>
);

export default Heading;