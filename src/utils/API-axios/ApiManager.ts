import axios from "axios";
import { Alert } from "react-native";

const url = "https://2092-2804-248-fb71-7a00-45d7-384c-896f-f247.ngrok-free.app";

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