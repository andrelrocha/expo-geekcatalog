import * as SecureStore from "expo-secure-store"

const TOKEN_KEY = "auth"

export const getToken = () => SecureStore.getItemAsync(TOKEN_KEY)

export const removeToken = () => SecureStore.deleteItemAsync(TOKEN_KEY)

export const setToken = (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token)