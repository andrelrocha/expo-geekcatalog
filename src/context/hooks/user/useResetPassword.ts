import { resetPassword } from "../../../services/user/resetPassword";
import { useState } from "react";
import { Alert } from "react-native";

interface ResetPassword {
    login: string;
    tokenMail: string;
    password: string;
}

export default function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleResetPassword = async (credentials: ResetPassword, navigate: () => void) => {
        setIsLoading(true);
        try {
            await resetPassword(credentials);
            setIsSuccess(true);
            Alert.alert('Success', 'Password reset successfully');
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to reset password";
            Alert.alert('Error', 'An error occurred while resetting password: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isSuccess,
        handleResetPassword,
    };
}