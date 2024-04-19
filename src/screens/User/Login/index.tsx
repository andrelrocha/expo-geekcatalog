import React, { useContext } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserLogin } from '../../../types/user/userLoginDTO';
import { styles } from '../styles';
import useUserLogin from '../../../hooks/user/useUserLogin';
import PageDefault from '../../Default';
import AuthContext, { AuthProvider } from '../../../context/auth.context';
import { useForm } from 'react-hook-form';
import Button from '../../../components/button';

const DEFAULT_FORM_VALUES = { email: "", password: "" }

const Login = () => {
  const { email, setEmail, password, setPassword } = useUserLogin();
  const { isLoading: isLoggingIn, login } = useContext(AuthContext);

  const {
    formState: { isValid },
    handleSubmit,
  } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

  const handleLogin = async () => {
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
        <Text style={styles.title}>Faça seu login</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu login"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
    
        <Button
          isDisabled={!isValid}
          isLoading={isLoggingIn}
          onPress={handleSubmit(async () =>
            handleLogin()
            )}
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