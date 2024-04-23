import axios from "axios";
import { Alert } from "react-native";

const url = "https://4683-2804-248-fb40-900-3d4f-e75-4215-2592.ngrok-free.app";

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