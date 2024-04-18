import axios from "axios";

async function checkServerAvailability() {
    try {
        await axios.get("https://50e6-2804-248-fbf6-a500-84a0-151d-95f9-3270.ngrok-free.app/infra/ping");
        console.log("Servidor está online.");
    } catch (error) {
        throw new Error("O servidor não está disponível.");
    }
}

export const ApiManager = axios.create({
    baseURL: "https://50e6-2804-248-fbf6-a500-84a0-151d-95f9-3270.ngrok-free.app",
    responseType: "json"
});

checkServerAvailability();