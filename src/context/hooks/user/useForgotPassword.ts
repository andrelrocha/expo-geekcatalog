import { useState } from "react";
import { forgotPassword } from "../../../services/user/forgotPassword";
import { Alert } from "react-native";

interface ForgotPassword {
    email: string;
}

export default function useForgotPassword() {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    
    const handleForgotPassword = async (credentials: ForgotPassword) => {
        setIsEmailSending(true);
        try {
            await forgotPassword(credentials.email);
            setIsEmailSent(true);
            Alert.alert('Success', 'Email sent successfully, check your inbox for the token to reset your password');
        } catch (error) {
            console.error('Error sending email:', error);
            Alert.alert('Error', 'Error sending email for password recovery');
        } finally {
            setIsEmailSending(false);
        }
    };
    
    return {
        email,
        setEmail,
        isEmailSent,
        isEmailSending,
        handleForgotPassword,
    };
}