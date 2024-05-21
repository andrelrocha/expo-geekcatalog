import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 75,
        width: 150,
        height: 150,
        borderColor: colors.lightGray,
        borderWidth: 5,
        backgroundColor: colors.whiteSmoke,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },  
});
