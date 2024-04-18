import { useState } from "react";

export default function useUserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return { 
        email, setEmail, 
        password, setPassword 
    };
}