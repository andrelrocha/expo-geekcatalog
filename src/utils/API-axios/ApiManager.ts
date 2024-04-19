import axios from "axios";
import { Alert } from "react-native";

const url = "https://423b-2804-14c-de86-851f-ed1a-d3d9-1366-3a5e.ngrok-free.app";

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