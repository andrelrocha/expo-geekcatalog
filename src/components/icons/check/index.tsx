import React from 'react';
import { InputIcon, CheckIcon as GLCheckIcon } from "@gluestack-ui/themed"; 
import { colors } from '../../../utils/colors';

const CheckIcon = () => {
  return (
    <InputIcon as={GLCheckIcon} color={colors.green} />
  );
};

export default CheckIcon;