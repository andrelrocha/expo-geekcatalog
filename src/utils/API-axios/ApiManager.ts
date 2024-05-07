import axios from "axios";
import { Alert } from "react-native";

const url = "https://b348-2804-14c-de86-851f-55df-e731-b135-4e6a.ngrok-free.app";

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