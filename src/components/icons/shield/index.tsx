import { Shield } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type ShieldIconProps = {
    color?: string;
    size?: number;
};

const ShieldIcon = (props: ShieldIconProps) => {
  return (
      <Shield color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default ShieldIcon;
