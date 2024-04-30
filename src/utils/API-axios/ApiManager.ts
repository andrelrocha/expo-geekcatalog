import axios from "axios";
import { Alert } from "react-native";

const url = "https://2977-2804-14c-de86-851f-8d04-9275-abfa-667f.ngrok-free.app";

export const ApiManager = axios.create({
    baseURL: url,
    responseType: "json"
});

async function checkServerAvailability() {
    try {
        await ApiManager.get("/infra/ping");
        console.log("Servidor está online.");
    } catch (error) {
        console.error("Servidor não está disponível.");
        Alert.alert("Erro", "Servidor não está disponível.");
    }
}

checkServerAvailability();