import { useEffect, useState } from "react"
import { View } from "react-native"
import { useAuth } from "../../../context/hooks";
import { Heading, ImageTouchable } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";

export default function UserInfo() {
    const { currentUser } = useAuth();
    const [profilePicURI, setProfilePicURI] = useState('');
    const userId = currentUser?.id;

    useEffect(() => {
        console.log('useEffect')

        const fetchProfilePic = async () => {
            try {
                const uri = await getProfilePic({ userId: userId || '' });
                setProfilePicURI(uri as string);
            } catch (error) {
                console.log('Erro ao buscar a imagem de perfil:', error);
            }
        };
        fetchProfilePic();
        /*
        ApiManager.get('/users').then((response) => {
            console.log(response.data)
            setId(response.data.id)
            setLogin(response.data.login)
            setName(response.data.name)
        })
        */
    }, [])

 

    return (
        <View>
            <Heading>Bem vindo {currentUser?.name}</Heading>

            <ImageTouchable source={profilePicURI} alt='Profile Picture' />
        </View>
    )
}