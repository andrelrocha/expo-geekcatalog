import { hasLowerCase, hasMinLength, hasNumber, hasUpperCase } from "./string";

const DEFAULT_PASSWORD_MIN_LENGTH = 8;

export const isValidPassword = (password: string) => {
    return (
        hasUpperCase(password) &&
        hasLowerCase(password) &&
        hasNumber(password) &&
        password.length >= DEFAULT_PASSWORD_MIN_LENGTH
    );
}

export const isPassword = (password: string, minLength: number) => {
    const validUpperCase = hasUpperCase(password)
    const validLowerCase = hasLowerCase(password)
    const validNumber = hasNumber(password)
    const validLength = hasMinLength(password, minLength)
  
    return validLength && validUpperCase && validLowerCase && validNumber
}

export const isSamePassword = (password: string, confirmPassword: string) => {
    const passwordLength = password.length
    const confirmPasswordLength = confirmPassword.length
    const hasLength = passwordLength > 0 && confirmPasswordLength > 0
    const isSamePassword = password === confirmPassword
  
    return hasLength && isSamePassword
}