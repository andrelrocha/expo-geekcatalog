import React from "react";
import { LayoutGrid } from "lucide-react-native";
import { colors } from "../../../utils/colors";

type GridIconProps = {
    color?: string;
    size?: number;
};

const GridIcon = (props: GridIconProps) => {
    return <LayoutGrid color={props.color || colors.buttonBlue} size={props.size || 20} />;
}

export default GridIcon;