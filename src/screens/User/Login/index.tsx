import React, { useContext } from 'react';
import { Control, useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { UserLogin } from '../../../types/user/userLoginDTO';
import PageDefault from '../../Default';
import AuthContext, { AuthProvider } from '../../../context/auth.context';
import { Button, Box, Heading, InputEmail, InputPassword, ButtonTouchable } from '../../../components';
import { colors } from '../../../utils/colors';

const DEFAULT_FORM_VALUES = { email: "", password: "" }

type FormData = {
  email: string;
  password: string;
};

const Login = ({ navigation }: NativeStackScreenProps<ParamListBase>) => {
  const { isLoading: isLoggingIn, login } = useContext(AuthContext);

  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

  const handleLogin = async (control: Control<FormData>) => {
    const email = control._formValues.email;
    const password = control._formValues.password;

    const userData: UserLogin = {
      login: email,
      password
    };

    await login(userData, () => navigation.navigate('UserStack', { screen: 'HomeUserInfo' }));
  };

  return (
      <PageDefault>
        <Heading mb={20} mt={10}>Sign In</Heading>

        <Box> 

          <InputEmail
            control={control}
            name="email"
            placeholder="Enter your e-mail"
            rules={{ required: true }}
          />
          
          <InputPassword
            control={control}
            name="password"
            placeholder="Enter your password"
            rules={{ required: true }}
            visibleValidation={false}
          />
        </Box>
    
        <Button
          isDisabled={!isValid}
          isLoading={isLoggingIn}
          onPress={handleSubmit(async () =>
            handleLogin(control)
            )}
          mt={20}
        >Login
        </Button>

        <ButtonTouchable
          onPress={() => navigation.navigate('NotAuthStack', { screen: 'SignUp' })}
          mt={6}
          w={150}
          backgroundColor={colors.greenStrong}
        >Sign Up
        </ButtonTouchable>

        <ButtonTouchable
          onPress={() => navigation.navigate('NotAuthStack', { screen: 'ForgotPassword' })}
          mt={6}
          w={150}
          backgroundColor={colors.redStrong} 
        >Forgot Password - falta implementar!
        </ButtonTouchable>
      </PageDefault>
  );
};

export default Login;