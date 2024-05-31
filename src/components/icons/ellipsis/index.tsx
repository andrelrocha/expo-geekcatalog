import { EllipsisVertical } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type EllipsisIconProps = {
    color?: string;
    size?: number;
};

const EllipsisIcon = (props: EllipsisIconProps) => {
  return (
      <EllipsisVertical color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default EllipsisIcon;
