import axios from "axios";
import { Alert } from "react-native";

const url = "https://3c40-2804-248-fb40-900-f4d8-33cc-f9ff-390c.ngrok-free.app";

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