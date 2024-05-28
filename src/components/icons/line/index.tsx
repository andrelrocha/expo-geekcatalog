import React from 'react';
import { colors } from '../../../utils/colors';
import { Minus } from 'lucide-react-native';

type MinusLineIconProps = {
  color?: string;
  size?: number;
};

const MinusLineIcon = (props: MinusLineIconProps) => {
  return (
      <Minus color={props.color || colors.gray} size={props.size || 20}/>
  );
};

export default MinusLineIcon;