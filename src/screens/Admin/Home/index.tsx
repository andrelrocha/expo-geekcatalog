import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { ButtonTouchable } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";

export default function HomeAdmin({ navigation }: NativeStackScreenProps<ParamListBase>) {
   
    return (
        <PageDefault>
            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('CreateGame')}
            >Create a game</ButtonTouchable>
          
        </PageDefault>
    )
}
