import axios from "axios";
import { Alert } from "react-native";

const url = "https://56db-2804-248-fb71-7a00-6cda-d272-e826-e192.ngrok-free.app";

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