import axios from "axios";
import { Alert } from "react-native";

const url = "https://8150-2804-248-fb40-900-353a-21e5-7291-6660.ngrok-free.app";

export const ApiManager = axios.create({
    baseURL: url,
    responseType: "json"
});

async function checkServerAvailability() {
    try {
        await ApiManager.get("/infra/ping");
        console.log("Server is online.");
    } catch (error) {
        console.error("Servidor is not available.");
        Alert.alert("Error", "Server is not available.");
    }
}

checkServerAvailability();