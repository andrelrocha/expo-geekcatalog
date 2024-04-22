import validator from "validator"

/**
 * Checks if a string has a valid brazilian zip code format.
 */
export const isCEP = (str: string, opts: { trim?: boolean } = {}) => {
  const trim = opts.trim ?? true
  const _str = trim ? str.replace(/[^0-9]/g, "") : str

  return _str.length === 8
}

/**
 * Checks if a string is a valid CNS.
 *
 * Implementation details at https://integracao.esusab.ufsc.br/v211/docs/algoritmo_CNS.html
 *
 */
export const isCNS = (str: string, opts: { trim?: boolean } = {}) => {
  const trim = opts.trim ?? true

  const _str = trim ? str.replace(/\s/g, "") : str

  if (!_str.match(/^\d{15}$/)) return false

  const numberArray = _str.split("").map(Number)

  if ([1, 2].includes(numberArray[0])) {
    const _numberArray = numberArray.slice(0, 11)
    const sum = _numberArray.reduce((acc, n, i) => acc + n * (15 - i), 0)
    const digit = calculateCNSDigit(sum)

    return digit === 10
      ? [..._numberArray, 0, 0, 1, 11 - ((sum + 2) % 11)].join("") === _str
      : [..._numberArray, 0, 0, 0, digit].join("") === _str
  }

  if ([7, 8, 9].includes(numberArray[0])) {
    return numberArray.reduce((acc, n, i) => acc + n * (15 - i), 0) % 11 === 0
  }

  return false
}

const calculateCNSDigit = (n: number) => {
  const digit = 11 - (n % 11)

  return digit === 11 ? 0 : digit
}

export const isMobilePhone = (phone: string) => {
  const validLength = phone.length === 11
  const validNumber = validator.isMobilePhone(phone, "pt-BR")

  return validLength && validNumber
}