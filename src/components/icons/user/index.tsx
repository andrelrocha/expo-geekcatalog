import { User } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type UserIconProps = {
    color?: string;
    size?: number;
};

const UserIcon = (props: UserIconProps) => {
  return (
      <User color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default UserIcon;
