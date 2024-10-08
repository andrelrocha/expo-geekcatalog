import { useState } from "react";
import { forgotPassword } from "../../../services/user/forgotPassword";
import { Alert } from "react-native";

interface ForgotPassword {
    email: string;
}

export default function useForgotPassword() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    
    const handleForgotPassword = async (credentials: ForgotPassword, navigate: () => void) => {
        setIsEmailSending(true);
        try {
            await forgotPassword(credentials);
            setIsEmailSent(true);
            Alert.alert('Success', 'Email sent successfully, check your inbox for the token to reset your password');
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to send email for password recovery";
            Alert.alert('Error', 'An error occurred while sending email for password recovery: ' + errorMessage);
        } finally {
            setIsEmailSending(false);
        }
    };


    
    return {
        isEmailSent,
        isEmailSending,
        handleForgotPassword,
    };
}