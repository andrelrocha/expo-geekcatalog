import { createContext, ReactNode, useEffect, useState } from "react";
import { loginUser } from '../services/user/login';
import { UserLogin } from '../types/user/userLoginDTO';
import { getUserByJWT } from "../services/user/getByJWT";
import { verifyJWT } from "../services/user/verifyJWT";
import { UserReturn } from "../types/user/userReturnDTO";
import { getToken, removeToken, setToken } from "../modules/auth.module";

type AuthContextData = {
    authState: {
        token: string | null;
        authenticated: boolean;
    };
    currentUser?: UserReturn;
    isLoading: boolean;
    login: (credentials: UserLogin) => any;
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
        } catch (error) {
          console.error("Erro ao fazer login:", error);
        } finally {
          setIsLoading(false);
        }
    };
  
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