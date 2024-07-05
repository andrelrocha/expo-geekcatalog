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
import { deleteUser } from "../services/user/delete";

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
    update: (user: UserUpdate) => any;
    deleteUserAccount: () => any;
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
    update: async () => {},
    deleteUserAccount: async () => {},
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
                  try {
                    const user = await getUserByJWT(token);
                    setCurrentUser(user);
                  } catch (error: any) {
                    const errorMessage = error.response?.data || error.message || "Failed to get user by JWT";
                    Alert.alert('Error', 'An error occurred while getting user by JWT: ' + errorMessage);
                    await removeToken();
                  }
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

          await loadStorageData();

          navigate();
        } catch (error: any) {
          const errorMessage = error.response?.data || error.message || "Failed to sign in user";
          Alert.alert('Error', 'An error occurred while logging into your account: ' + errorMessage);
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

        if (credentials.uri) {
          try {
            await saveProfilePic({ uri: credentials.uri, userId: newUser?.id as string});
          } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to save profile picture";
            Alert.alert('Error', 'An error occurred while saving your profile picture: ' + errorMessage);
          }
        }
        
        await loadStorageData();

        Alert.alert('Success', 'User created successfully!');
        
        navigate();
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to sign up user";
        Alert.alert('Error', 'An error occurred while creating your account: ' + errorMessage);
        await removeToken();
      } finally {
        setIsLoading(false);
      }
    }

    const update = async (user: UserUpdate) => {
      setIsLoading(true);
      try {
        const updatedUser = await updateUserInfo(user);
        if (updatedUser === undefined) {
          console.error("Error updating user");
          return;
        }
        setCurrentUser(updatedUser);

        if (user.uri) {
          try {
            await saveProfilePic({ uri: user.uri, userId: updatedUser?.id as string});
          } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to save profile picture";
            Alert.alert('Error', 'An error occurred while saving your profile picture: ' + errorMessage);
          }
        }

        await loadStorageData();

        Alert.alert('Success', 'User updated successfully!');
        
        setIsLoading(false);
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to update user";
        Alert.alert('Error', 'An error occurred while updating your account: ' + errorMessage);
      }
    };

    const deleteUserAccount = async () => {
      setIsLoading(true);
      try {
        await deleteUser({ userId: currentUser?.id as string });
        await logout();
        Alert.alert('Success', 'User deleted successfully!');
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message || "Failed to delete user";
        Alert.alert('Error', 'An error occurred while deleting your account: ' + errorMessage);
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
        signUp,
        logout,
        update,
        deleteUserAccount,
    };

    return (
      <AuthContext.Provider
        value={value}>
        {props.children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;