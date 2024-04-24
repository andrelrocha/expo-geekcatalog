import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
    marginTop: 0
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.black,
    width: '80%'
  },
  box: {
    width: '90%',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.buttonBlue,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%'
  },
  smallButtonGreen: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.green,
    marginRight: 10
  },
  smallButtonRed: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.redWeak,
    marginLeft: 10
  },
  buttonCadastro: {
    backgroundColor: colors.greenStrong,
    marginTop: 10
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 16
  },
  containerAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 100,
    marginBottom: 10
  }
});