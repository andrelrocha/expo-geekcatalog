import { MoveHorizontal } from "lucide-react-native";
import React from "react";
import { colors } from "../../../utils/colors";

type HorizontalIconProps = {
    color?: string;
    size?: number;
};

const HorizontalIcon = (props: HorizontalIconProps) => {
    return <MoveHorizontal color={props.color || colors.whiteSmoke} size={props.size || 20} />;
};

export default HorizontalIcon;