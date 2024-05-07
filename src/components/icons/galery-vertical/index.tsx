import React from "react";
import { GalleryVertical } from "lucide-react-native";
import { colors } from "../../../utils/colors";

type GalleryVerticalIconProps = {
    color?: string;
    size?: number;
};

const GalleryVerticalIcon = (props: GalleryVerticalIconProps) => {
    return <GalleryVertical color={props.color || colors.buttonBlue} size={props.size || 20} />;
}

export default GalleryVerticalIcon;