import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    containerTitle: {
        paddingTop: 30,
        alignSelf: 'flex-start',
        marginLeft: 26,
        width: '90%',
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.black,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 20,
      color: colors.black
    },
    containerButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    button: {
        backgroundColor: '#007bff',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 20,

        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonText: {
        color: colors.whiteSmoke,
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%'
    },
    smallButtonText: {
        color: colors.whiteSmoke,
        fontSize: 16
    },
    imageContainer: {
        position: 'absolute',
        top: 150,
        zIndex: -1,
        right: -width * 0.3,
        opacity: 0.3,
    },
    image: {
        resizeMode: 'contain',
    },
});