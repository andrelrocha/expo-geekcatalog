import { useState } from "react";
import { Alert } from "react-native";
import { createUser } from "../../services/user/create";
import { UserCreate } from "../../types/user/userCreateDTO";

export default function useUserCreation() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const handleBirthdayInputChange = () => {
    const [day, month, year] = birthday.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const formattedDate = parsedDate.toISOString().substring(0, 10);
    return formattedDate;
  };

  const handleCreateUser = async () => {
    if (login === '' || password === '' || name === '' || cpf === '' || phone === '' || birthday === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedDate = handleBirthdayInputChange();

    const userData: UserCreate = {
      login,
      password,
      name,
      cpf,
      phone,
      birthday: parsedDate
    };

    try {
      const userReturn = await createUser(userData);
      Alert.alert('Conta criada!', `Bem-vindo, ${userReturn?.name}`);
      // Troca para tela de login
    } catch (error: any) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar um usuário: ' + (error.response?.data || 'Erro desconhecido'));
    }
  }

  return {
    login, setLogin,
    password, setPassword,
    name, setName,
    cpf, setCpf,
    phone, setPhone,
    birthday, setBirthday,
    handleCreateUser
  };
}
