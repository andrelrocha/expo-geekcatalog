import React, { useContext } from 'react';
import { Alert, TextInput } from 'react-native';
import { Control, useForm } from 'react-hook-form';
import { UserLogin } from '../../../types/user/userLoginDTO';
import PageDefault from '../../Default';
import AuthContext, { AuthProvider } from '../../../context/auth.context';
import { Button, BoxInput, Heading, InputEmail, InputPassword } from '../../../components';

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

    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return null;
    }

    const userData: UserLogin = {
      login: email,
      password
    };

    try {
      await login(userData);
      Alert.alert('Sucesso', 'Usuário logado com sucesso!');
      // Trocar para a tela de home
    } catch (error: any) {
      Alert.alert('Erro', 'Ocorreu um erro ao logar na sua conta: ' + error.response?.data || 'Erro desconhecido');
    }
  };

  return (
      <PageDefault>
        <Heading>Faça seu login</Heading>

        <BoxInput> 

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
        </BoxInput>
    
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