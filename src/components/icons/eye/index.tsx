import { Eye } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type EyeIconProps = {
    color?: string;
    size?: number;
};

const EyeIcon = (props: EyeIconProps) => {
  return (
      <Eye color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default EyeIcon;
