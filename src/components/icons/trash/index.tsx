import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type TrashIconProps = {
    color?: string;
    size?: number;
};

const TrashIcon = (props: TrashIconProps) => {
  return (
      <Trash2 color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default TrashIcon;
