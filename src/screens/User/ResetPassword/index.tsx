import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

import PageDefault from '../../Default';
import { Box, Button, Heading, InputEmail, InputText, InputPassword, PasswordWarning, InputPasswordValidation } from '../../../components';
import useResetPassword from '../../../context/hooks/user/useResetPassword';
import { Control, useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
    email: string;
    tokenMail: string;
    password: string;
};

const DEFAULT_FORM_VALUES = { email: "", tokenMail: "", password: ""};

const ResetPassword = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
    const { isLoading, isSuccess, handleResetPassword } = useResetPassword();
    const [isPasswordClicked, setIsPasswordClicked] = useState(false);

    const {
        control,
        formState: { isValid },
        handleSubmit,
    } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: 'onChange' });

    const handleResetPasswordControl = async (control: Control<FormData>) => {
        const data = {
            login: control._formValues.email,
            tokenMail: control._formValues.tokenMail,
            password: control._formValues.password,
        }
        await handleResetPassword(data, () => navigation.navigate('NotAuthStack', { screen: 'Login' }))
    };

    return (
        <PageDefault>
            <Heading mb={20} mt={10}>Reset Password</Heading>

            <Box>
                <InputEmail
                    control={control}
                    name="email"
                    placeholder="Enter your e-mail"
                    icon={0}
                    rules={{ required: true }}
                />
                <InputText
                    control={control}
                    name="tokenMail"
                    placeholder="Enter your token"
                    rules={{ required: true }}
                />
                <InputPasswordValidation 
                    control={control} 
                    name="password" 
                    placeholder="Enter your new password" 
                    rules={{ required: true}} 
                    onTouchStart={() => setIsPasswordClicked(!isPasswordClicked)}
                />

                {isPasswordClicked && <PasswordWarning isVisible={isPasswordClicked} />}

                {/*
                <InputPassword 
                    control={control} 
                    name="passwordConfirm" 
                    placeholder="Confirm new password"
                    rules={{ required: true }}
                    onTouchStart={() => setIsPasswordClicked(false)}
                />
                */}
            </Box>

            <Button
                onPress={handleSubmit(() => handleResetPasswordControl(control))}
                isLoading={isLoading}
                disabled={!isValid}
                mt={20}
            >Send
            </Button>
        </PageDefault>
    );
}

export default ResetPassword;