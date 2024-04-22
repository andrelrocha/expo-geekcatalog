import { cpf } from "cpf-cnpj-validator"
import moment from "moment"

// ##################### REGEX #####################

const NAME_REGEX = new RegExp(`^[a-zA-Z0-9\\sÀ-ü]{3,}$`)

// ############### STRING VALIDATIONS ###############
export const isCPF = (cpfValue: string) => cpf.isValid(cpfValue)

export const isName = (name: string) => NAME_REGEX.test(name)

// ############## COMPLEX VALIDATIONS ##############


// Phone validations

// Date validations
export const isDateValid = (
  dateValue: string,
  dateFormat: string,
  reference: "after" | "before"
) => {
  const now = moment()
  const date = moment(dateValue, dateFormat, true).startOf("month")

  const validDate = date.isValid()

  if (reference === "after") {
    const isAfterToday = date.isAfter(now)
    return validDate && isAfterToday
  } else if (reference === "before") {
    const isBeforeToday = date.isBefore(now)
    return validDate && isBeforeToday
  }

  return false
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