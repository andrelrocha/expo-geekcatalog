export const hasUpperCase = (str: string) => /[A-Z]/.test(str)

export const hasLowerCase = (str: string) => /[a-z]/.test(str)

export const hasNumber = (str: string) => /[0-9]/.test(str)

export const hasMinLength = (str: string, minLength: number) => str.length >= minLength

export const hasSpecialCharacter = (str: string, DEFAULT_SPECIAL_CHAR_REGEX = /[!@#$%^&*]/) =>
  DEFAULT_SPECIAL_CHAR_REGEX.test(str)

export const takeWord = (str: string, index: number, separator = " ") => str.split(separator)[index]