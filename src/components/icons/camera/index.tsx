import { Camera } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type CameraIconProps = {
    color?: string;
    size?: number;
};

const CameraIcon = (props: CameraIconProps) => {
  return (
      <Camera color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default CameraIcon;
