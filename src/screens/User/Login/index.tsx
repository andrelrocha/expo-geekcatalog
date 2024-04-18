import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginUser } from '../../../services/user/login';
import { UserLogin } from '../../../types/user/userLoginDTO';
import { styles } from '../styles';
import useUserLogin from '../../../hooks/user/useUserLogin';
import PageDefault from '../../Default';

const Login = () => {
  const { login, setLogin, password, setPassword } = useUserLogin();

  async function handleLogin() {
    if (login === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const userData: UserLogin = {
      login,
      password
    };

    try {
      const status = await loginUser(userData);
      if (status) {
        Alert.alert('Sucesso', 'Usuário logado com sucesso!');
        //trocar para a tela de home
      }
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
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButtonGreen}>
          <Text style={styles.smallButtonText}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButtonRed}>
          <Text style={styles.smallButtonText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </PageDefault>
  );
};

export default Login;
