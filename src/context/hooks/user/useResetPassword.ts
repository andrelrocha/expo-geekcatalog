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
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error resetting password');
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