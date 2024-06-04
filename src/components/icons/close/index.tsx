import React from 'react';
import { X } from 'lucide-react-native';
import { colors } from '../../../utils/colors';

interface CloseIconProps {
  size?: number;
  color?: string;
}

const CloseIcon = (props: CloseIconProps) => {
  return (
    <X size={props.size || 20} color={colors.redStrong || props.color} />
  );
};

export default CloseIcon;