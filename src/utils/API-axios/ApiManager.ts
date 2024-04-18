import axios from "axios";

const url = "https://1333-2804-248-fbf6-a500-f133-5a15-9324-9c1b.ngrok-free.app";

export const ApiManager = axios.create({
    baseURL: url,
    responseType: "json"
});

async function checkServerAvailability() {
    try {
        await ApiManager.get("/infra/ping");
        console.log("Servidor está online.");
    } catch (error) {
        throw new Error("O servidor não está disponível.");
    }
}

checkServerAvailability();