import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { loginUser } from '../services/user/login';
import { createUser } from "../services/user/create";
import { UserLogin } from '../types/user/userLoginDTO';
import { getUserByJWT } from "../services/user/getByJWT";
import { verifyJWT } from "../services/user/verifyJWT";
import { UserReturn } from "../types/user/userReturnDTO";
import { getToken, removeToken, setToken } from "../modules/auth.module";
import { UserCreate } from "../types/user/userCreateDTO";
import { saveProfilePic } from "../services/user/saveProfilePic";
import { UserUpdate } from "../types/user/userUpdateDTO";
import { updateUserInfo } from "../services/user/update";

type AuthContextData = {
    authState: {
        token: string | null;
        authenticated: boolean;
    };
    currentUser?: UserReturn;
    isLoading: boolean;
    login: (credentials: UserLogin, navigate: () => void) => any;
    signUp: (credentials: UserCreate, navigate: () => void) => any;
    logout: () => any;
    updateUser: (user: UserUpdate) => void;
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
    updateUser: async () => {},
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
      loadStorageData();
    }, []);

    const loadStorageData = async () => {
        const token = await getToken();
        if (token) {
            const response = await verifyJWT(token);
            
            if (response.data === true) {
                setAuthState({
                    token,
                    authenticated: true,
                }); 

                if (currentUser == undefined) {
                  const user = await getUserByJWT(token);
                  setCurrentUser(user);
                }
            } else {
                logout();
              }
        } else {
          logout();
        }
    };

    const login = async (credentials: UserLogin, navigate: () => void) => {
        setIsLoading(true);
        try {
          const tokenJWT = await loginUser(credentials);
          if (tokenJWT === '' || tokenJWT === undefined) {
            console.error("Empty or undefined JWT token");
            return;
          }
          setAuthState({
            token: tokenJWT,
            authenticated: true,
          });

          await setToken(tokenJWT);

          loadStorageData();

          navigate();
        } catch (error: any) {
          console.error("Error while logging in:", error);
          if (error.response?.data) {
            Alert.alert('Error', 'An error occurred while logging into your account: ' + error.response?.data || 'Unknown error');
          } else {
            Alert.alert('Error', 'An error occurred while logging into your account: ' + error || 'Unknown error');
          }
          await removeToken();
        } finally {
          setIsLoading(false);
        }
    };

    const signUp = async (credentials: UserCreate, navigate: () => void) => {
      setIsLoading(true);
      credentials.phone = credentials.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

      try {
        const newUser = await createUser(credentials);

        if (newUser === undefined) {
            console.error("Error creating user");
            return;
        }
        const tokenJWT = await loginUser({
            login: credentials.login,
            password: credentials.password
        });
        if (tokenJWT === '' || tokenJWT === undefined) {
          console.error("Empty or undefined JWT token");
          return;
        }

        setAuthState({
          token: tokenJWT,
          authenticated: true,
        });

        await setToken(tokenJWT);

        loadStorageData();

        saveProfilePic({ uri: credentials.uri, userId: newUser?.id as string});

        Alert.alert('Success', 'User created successfully!');

        navigate();
      } catch (error: any) {
        console.error("Error creating a new user:", error);
        if (error.response?.data) {
          Alert.alert('Error', 'An error occurred while creating your account: ' + error.response?.data || 'Unknown error');
        } else {
          Alert.alert('Error', 'An error occurred while creating your account: ' + error || 'Unknown error');
        }
        await removeToken();
      } finally {
        setIsLoading(false);
      }
    }

    const updateUser = async (user: UserUpdate) => {
      setIsLoading(true);
      try {
        const updatedUser = await updateUserInfo(user);
        if (updatedUser === undefined) {
          console.error("Error updating user");
          return;
        }
        setCurrentUser(updatedUser);

        loadStorageData();

        Alert.alert('Success', 'User updated successfully!');
        
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error updating user:", error);
        if (error.response?.data) {
          Alert.alert('Error', 'An error occurred while updating your account: ' + error.response?.data || 'Unknown error');
        } else {
          Alert.alert('Error', 'An error occurred while updating your account: ' + error || 'Unknown error');
        }
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
        signUp,
        logout,
        updateUser,
    };

    return (
      <AuthContext.Provider
        value={value}>
        {props.children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;