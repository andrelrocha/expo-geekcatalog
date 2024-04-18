import React from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import MaskInput, { Masks } from 'react-native-mask-input';
import { styles } from "../styles";
import useUserCreation from "../../../hooks/user/useUserCreation";
import PageDefault from "../../Default";

function Create() {
  const {
    login, setLogin,
    password, setPassword,
    name, setName,
    cpf, setCpf,
    phone, setPhone,
    birthday, setBirthday,
    handleCreateUser
  } = useUserCreation();
  
  return (
    <PageDefault>
        <Text style={styles.title}>
          Welcome to Geek Catalog!
        </Text>

        <Text style={styles.subtitle}>
          Fill in the fields below to create your account
        </Text>

        <TextInput
          placeholder="Complete your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <MaskInput
          placeholder="Complete your CPF"
          style={styles.input}
          value={cpf}
          onChangeText={(masked, unmasked) => setCpf(masked)}
          mask={Masks.BRL_CPF}
          keyboardType="phone-pad"
        />
        <MaskInput
          placeholder="Complete your phone number"
          style={styles.input}
          value={phone}
          onChangeText={(masked, unmasked) => setPhone(masked)}
          mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
          keyboardType="phone-pad"
        />

        <MaskInput
          placeholder="Complete your birthday"
          style={styles.input}
          value={birthday}
          onChangeText={(masked, unmasked) => setBirthday(masked)}
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="phone-pad"
        />

        {/*componente não suportado pelo expogo, exige componentes nativos
        <DatePicker
          modal
          open={open}
          date={birthday}
          onConfirm={(date) => {
              setOpen(false);
              setBirthday(date);
              setBirthdaySelected(true);
            }
          }
          onCancel={() => {
            setOpen(false)
          }}
          mode="date"
        />
        */}

        <TextInput
          placeholder="Complete your email/login"
          style={styles.input}
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Choose a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={[styles.smallButtonGreen, styles.buttonCadastro]}>
            <Text style={styles.smallButtonText} onPress={handleCreateUser}>Cadastre-se</Text>
          </TouchableOpacity>
      </PageDefault>
  );
}

export default Create;
