import { useState } from "react";

export default function useUserCreation() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthdaySelected, setBirthdaySelected] = useState(false);
  const [open, setOpen] = useState(false);

  const formattedMonth = String(birthday.getMonth() + 1).padStart(2, '0');
  const formattedDay = String(birthday.getDate()).padStart(2, '0');

  const formattedBirthdayApi = `${birthday.getFullYear()}-${formattedMonth}-${formattedDay}`;
  const formattedBirthday = `${formattedDay}/${formattedMonth}/${birthday.getFullYear()}`;

  return {
    login, setLogin,
    password, setPassword,
    name, setName,
    cpf, setCpf,
    phone, setPhone,
    birthday, setBirthday,
    birthdaySelected, setBirthdaySelected,
    open, setOpen,
    formattedBirthday, formattedBirthdayApi
  };
}
