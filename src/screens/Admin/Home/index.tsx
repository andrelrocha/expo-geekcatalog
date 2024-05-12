import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { ButtonTouchable } from "../../../components";
import PageDefault from "../../Default";
import { colors } from "../../../utils/colors";
import { listAllInfoByGameID } from '../../../services/games/listAllInfoById';

const handle = () => {
    return  {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyZXJvY2hhMDkxMUBnbWFpbC5jb20iLCJpc3MiOiJhbmRyZSByb2NoYSIsImlkIjoiNGEwZTBkNTgtNDVjNS00YjNlLTlmZDgtYzU3OGMwNTcyMmE5IiwiZXhwIjoxNzE1NTM1MDI1fQ.KOWIHEoOffPYVm13ffocK0QoPiWL_rO-dIxI98FWy28',
        gameId: '1246d567-4a0d-445a-a1f7-026eaedf760c'
    }
}

export default function HomeAdmin({ navigation }: NativeStackScreenProps<ParamListBase>) {
    return (
        <PageDefault>
            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('CreateGame')}
            >Create a game</ButtonTouchable>


            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black} 
                onPress={() => navigation.navigate('CreateStudio')}
            >Create a studio</ButtonTouchable>

            <ButtonTouchable mt={30} backgroundColor={colors.sage} textColor={colors.black}
                onPress={() => {
                    listAllInfoByGameID(handle());
                }}
            >List all games</ButtonTouchable>
        </PageDefault>
    )
}
