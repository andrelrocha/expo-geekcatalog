import { MoveVertical } from "lucide-react-native";
import React from "react";
import { colors } from "../../../utils/colors";

type VerticalIconProps = {
    color?: string;
    size?: number;
};

const VerticalIcon = (props: VerticalIconProps) => {
    return <MoveVertical color={props.color || colors.whiteSmoke} size={props.size || 20} />;
};

export default VerticalIcon;