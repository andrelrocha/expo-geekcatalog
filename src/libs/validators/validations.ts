import { cpf } from "cpf-cnpj-validator"
import { isValid, isAfter, isBefore } from 'date-fns';

// ##################### REGEX #####################

const NAME_REGEX = new RegExp(`^[a-zA-Z0-9\\sÀ-ü]{3,}$`)

// ############### STRING VALIDATIONS ###############
export const isCPF = (cpfValue: string) => cpf.isValid(cpfValue)

export const isName = (name: string) => NAME_REGEX.test(name)

// ############## COMPLEX VALIDATIONS ##############


// Phone validations

// Date validations (day.js has critical bugs https://github.com/iamkun/dayjs/issues/2069), so i've made my own date validation method
// date-fns doesn't handle well when the date is formatted as "dd/MM/yyyy", so i have a mask which come as dateValue and i have to parse it to a valid Date object
export const isDateValid =  (
  dateValue: string,
  reference: "after" | "before"
) => {
  if (dateValue.length !== 8) return false;

  const now = new Date();

  const day = dateValue.slice(0, 2);
  const month = dateValue.slice(2, 4);
  const year = dateValue.slice(4, 8);

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const validDate = isValid(date);

  if (reference === 'after') {
    const isAfterToday = isAfter(date, now);
    return validDate && isAfterToday;
  } else if (reference === 'before') {
    const isBeforeToday = isBefore(date, now);
    return validDate && isBeforeToday;
  }

  return false;
}

// CEP validations
export const isCEP = async (cepValue: string) => {
  const validLength = cepValue.length === 8
  if (!validLength) return false

  const fetchURL = `https://viacep.com.br/ws/${cepValue}/json/`
  const response = await fetch(fetchURL)
  const data = await response.json()

  return {
    data,
    validation: validLength && !data.erro,
  }
}