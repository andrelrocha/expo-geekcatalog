import { SquarePen } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type SquarePenIconProps = {
    color?: string;
    size?: number;
};

const SquarePenIcon = (props: SquarePenIconProps) => {
  return (
      <SquarePen color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default SquarePenIcon;