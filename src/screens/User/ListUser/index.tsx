import { useEffect, useReducer, useState } from "react"
import { ApiManager } from "../../../utils/API-axios/ApiManager"
import { FlatList, Text, View } from "react-native"
import { TouchableOpacity } from "react-native";
import Header from "../../../components/header"

export default function Users() {
    const [id, setId] = useState('')
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')

    //const [selected, setSelected] = useState(false)
    const [selected, invertSelected] = useReducer(
        (selected) => {
            console.log('useReducer')
            console.log(selected)
            return !selected;
        }, false
    );

    useEffect(() => {
        console.log('useEffect')
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
            <TouchableOpacity onPress={invertSelected}>
                <Text>Selecionar</Text>
            </TouchableOpacity>

            <FlatList
                data={[{ key: id, login, name }]}
                renderItem={({ item }) => <Text>{item.key} - {item.login} / {item.name}</Text>}
                ListHeaderComponent={Header}
            />
        </View>
    )
}