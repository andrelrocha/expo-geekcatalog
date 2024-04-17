import { useState } from "react";

export default function useUserLogin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    return { 
        login, setLogin, 
        password, setPassword 
    };
}