import { useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TrashIcon, SquarePenIcon } from "../icons"; 
import { colors } from "../../utils/colors";

type optionsProps = {
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
};

type PopupMenuProps = {
    options: optionsProps[],
    visible: boolean,
    setVisible: (visible: boolean) => void;
    position: { x: number; y: number };
};

const PopupMenu = (props: PopupMenuProps) => {
    console.log(props.position);
    return props.visible ? (
        <View style={[styles.container, { top: props.position.y, left: props.position.x }]}>
            {props.options.map((option, index) => (
                <TouchableOpacity key={index} onPress={option.onPress} style={styles.item}>
                    <Text style={styles.text}>{option.label}</Text>
                    {option.icon}
                </TouchableOpacity>
            ))}
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.whiteSmoke,
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    containerItem: {
        width: 160,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        margin: 1,
        padding: 10,
    },
    text: {
        fontSize: 18,
        color: colors.black,
    },
});


export default PopupMenu;