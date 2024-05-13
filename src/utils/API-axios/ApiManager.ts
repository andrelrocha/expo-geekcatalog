import axios from "axios";
import { Alert } from "react-native";

const url = "https://a99d-2804-14c-de86-851f-5185-85b5-add4-206.ngrok-free.app";

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