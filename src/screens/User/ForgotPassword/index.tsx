import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Control, useForm } from 'react-hook-form';
import useForgotPassword from '../../../context/hooks/user/useForgotPassword';
import PageDefault from '../../Default';
import { Box, Button, Heading, InputEmail } from '../../../components';

const DEFAULT_FORM_VALUES = { email: ""}

type FormData = {
  email: string;
};

const ForgotPassword = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
    const { 
        isEmailSent,
        isEmailSending,
        handleForgotPassword } = useForgotPassword();
 
    const {
        control,
        formState: { isValid },
        handleSubmit
    } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

    const handleForgotPasswordControl = async (control: Control<FormData>) => {
        const email = control._formValues.email;
        await handleForgotPassword( email, () => navigation.navigate('NotAuthStack', { screen: 'ResetPassword' }));
    }
    
    return (
        <PageDefault>
            <Heading mb={20} mt={10}>Forgot Password</Heading>

            <Box>
                <InputEmail
                    control={control}
                    name="email"
                    placeholder="Enter your e-mail"
                    rules={{ required: true }}
                />
            </Box>

            <Button
                onPress={handleSubmit(() => handleForgotPasswordControl(control))}
                isLoading={isEmailSending}
                disabled={!isValid}
                mt={20}
            >Send
            </Button>
        </PageDefault>
    );
}

export default ForgotPassword;