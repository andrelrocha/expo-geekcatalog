import axios from "axios";

export const ApiManager = axios.create({
    baseURL: "https://49df-2804-14c-de86-851f-a92e-ed0c-7cbc-f06c.ngrok-free.app",
    responseType: "json"
});