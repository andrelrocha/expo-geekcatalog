import { Gamepad2 } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../../utils/colors';

type GameControllerIconProps = {
    color?: string;
    size?: number;
};

const GameControllerIcon = (props: GameControllerIconProps) => {
  return (
      <Gamepad2 color={props.color || colors.whiteSmoke} size={props.size || 20}/>
  );
};

export default GameControllerIcon;