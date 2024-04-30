import React, { useContext } from 'react';
import { Control, useForm } from 'react-hook-form';
import { UserLogin } from '../../../types/user/userLoginDTO';
import PageDefault from '../../Default';
import AuthContext, { AuthProvider } from '../../../context/auth.context';
import { Button, Box, Heading, InputEmail, InputPassword } from '../../../components';

const DEFAULT_FORM_VALUES = { email: "", password: "" }

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
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

    await login(userData);
  };

  return (
      <PageDefault>
        <Heading>Faça seu login</Heading>

        <Box> 

          <InputEmail
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            rules={{ required: true }}
          />
          
          <InputPassword
            control={control}
            name="password"
            placeholder="Digite sua senha"
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
        >Entrar
        </Button>
      </PageDefault>
  );
};

const LoginWithContext = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

export default LoginWithContext;