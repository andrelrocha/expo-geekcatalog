import { Search } from "lucide-react-native";
import React from "react";
import { colors } from "../../../utils/colors";

type SearchIconProps = {
    color?: string;
    size?: number;
};

const SearchIcon = (props: SearchIconProps) => {
    return <Search color={props.color || colors.whiteSmoke} size={props.size || 20} />;
};

export default SearchIcon;