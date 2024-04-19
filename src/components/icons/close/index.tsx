import React from 'react';
import { InputIcon, CloseIcon as GLCloseIcon } from "@gluestack-ui/themed"; 
import { colors } from '../../../utils/colors';

const CloseIcon = () => {
  return (
    <InputIcon as={GLCloseIcon} color={colors.redStrong} />
  );
};

export default CloseIcon;