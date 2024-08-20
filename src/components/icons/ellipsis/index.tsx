import { EllipsisVertical, Ellipsis } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type EllipsisIconProps = {
    color?: string;
    size?: number;
    horizontal?: boolean;
};

const EllipsisIcon = (props: EllipsisIconProps) => {
  return (
    <>
      {props.horizontal ? <Ellipsis color={props.color || colors.whiteSmoke} size={props.size || 20}/> : <EllipsisVertical color={props.color || colors.whiteSmoke} size={props.size || 20}/>}
    </>
  );
};

export default EllipsisIcon;
