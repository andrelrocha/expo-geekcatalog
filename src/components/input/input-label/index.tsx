import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../utils/colors";

type InputWithLabelProps = {
    label: string;
    children: ReactNode;
};

const InputWithLabel = (props: InputWithLabelProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{props.label}</Text>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 5,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default InputWithLabel;
