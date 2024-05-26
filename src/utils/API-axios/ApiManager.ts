import axios from "axios";
import { Alert } from "react-native";

const url = "https://247d-2804-248-fbdd-9c00-9d62-74e6-a282-14a6.ngrok-free.app";

export const ApiManager = axios.create({
    baseURL: url,
    responseType: "json"
});

export const ApiManagerMultiPart = axios.create({
    baseURL: url,
    responseType: "blob"
});

async function checkServerAvailability() {
    try {
        await ApiManager.get("/infra/ping");
        console.log("Server is online.");
    } catch (error) {
        console.error("Server is not available.");
        Alert.alert("Error", "Server is not available.");
    }
}

checkServerAvailability();