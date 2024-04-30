import { createContext, ReactNode, useEffect, useState } from "react";
import { loginUser } from '../services/user/login';
import { createUser } from "../services/user/create";
import { UserLogin } from '../types/user/userLoginDTO';
import { getUserByJWT } from "../services/user/getByJWT";
import { verifyJWT } from "../services/user/verifyJWT";
import { UserReturn } from "../types/user/userReturnDTO";
import { getToken, removeToken, setToken } from "../modules/auth.module";
import { UserCreate } from "../types/user/userCreateDTO";
import { Alert } from "react-native";

type AuthContextData = {
    authState: {
        token: string | null;
        authenticated: boolean;
    };
    currentUser?: UserReturn;
    isLoading: boolean;
    login: (credentials: UserLogin) => any;
    signUp: (credentials: UserCreate) => any;
    logout: () => any;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({
    authState: {
        token: null,
        authenticated: false,
    },
    currentUser: undefined,
    isLoading: false,
    login: async () => {},
    signUp: async () => {},
    logout: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserReturn | undefined>(undefined);
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean,
    }>({
        token: null,
        authenticated: false,
    });

    useEffect(() => {
        const loadStorageData = async () => {
            const token = await getToken();
            if (token) {
                const response = await verifyJWT(token);
                
                if (response.data === true) {
                    setAuthState({
                        token,
                        authenticated: true,
                    });
                    
                    const user = await getUserByJWT(token);
                    setCurrentUser(user);
                }
            }
        };

        loadStorageData();
    }, []);
  
    const login = async (credentials: UserLogin) => {
        setIsLoading(true);
        try {
          const tokenJWT = await loginUser(credentials);
          if (tokenJWT === '' || tokenJWT === undefined) {
            console.error("Token JWT vazio ou indefinido");
            return;
          }
          setAuthState({
            token: tokenJWT,
            authenticated: true,
          });

          const user = await getUserByJWT(tokenJWT);
          setCurrentUser(user);

          await setToken(tokenJWT);
        } catch (error: any) {
          console.error("Erro ao fazer login:", error);
          if (error.response?.data) {
            Alert.alert('Erro', 'Ocorreu um erro ao logar na sua conta: ' + error.response?.data || 'Erro desconhecido');
          } else {
            Alert.alert('Erro', 'Ocorreu um erro ao logar na sua conta: ' + error || 'Erro desconhecido');
          }
          await removeToken();
        } finally {
          setIsLoading(false);
        }
    };

    const signUp = async (credentials: UserCreate) => {
      setIsLoading(true);
      credentials.phone = credentials.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

      try {
        const newUser = await createUser(credentials);
          if (newUser === undefined) {
              console.error("Erro ao criar usuário");
              return;
          }
          const tokenJWT = await loginUser({
              login: credentials.login,
              password: credentials.password
          });
          console.log("tokenJwt: " + tokenJWT);
          if (tokenJWT === '' || tokenJWT === undefined) {
            console.error("Token JWT vazio ou indefinido");
            return;
          }
        setAuthState({
          token: tokenJWT,
          authenticated: true,
        });

        setCurrentUser(newUser);

        await setToken(tokenJWT);

        console.log("Usuário criado com sucesso")
      } catch (error: any) {
        console.error("Erro ao criar um novo usuário:", error);
        if (error.response?.data) {
          Alert.alert('Erro', 'Ocorreu um erro ao criar a sua conta: ' + error.response?.data || 'Erro desconhecido');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao criar a sua conta: ' + error || 'Erro desconhecido');
        }
        await removeToken();
      } finally {
        setIsLoading(false);
      }
    }
  
    const logout = async () => {
        setAuthState({
            token: null,
            authenticated: false,
        })
        setCurrentUser(undefined);

        await removeToken();
    };
  
    const value = {
        authState,
        currentUser,
        isLoading,
        login,
        signUp,
        logout,
    };

    return (
      <AuthContext.Provider
        value={value}>
        {props.children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;