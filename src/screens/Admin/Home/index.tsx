import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { ButtonTouchable } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { useEffect } from 'react';
import useConsolesDropdown from "../../../context/hooks/consoles";

export default function HomeAdmin({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const { dropdownData } = useConsolesDropdown();

    return (
        <PageDefault>
            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('CreateGame')}
            >Create a game</ButtonTouchable>

            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black}
                onPress={() => console.log(dropdownData)}
            >List all consoles</ButtonTouchable>
          
        </PageDefault>
    )
}
