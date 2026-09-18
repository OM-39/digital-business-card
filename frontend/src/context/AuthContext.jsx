import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser
} from "../services/authService";

const AuthContext =
    createContext(null);

export const AuthProvider = ({
    children
}) => {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const checkAuth = async () => {
        try {

            const response =
                await getCurrentUser();

            setUser(
                response.user
            );

        } catch {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const register = async (data) => {

        const response =
            await registerUser(data);

        return response;
    };

    const login = async (data) => {

        const response =
            await loginUser(data);

        setUser(response.user);

        return response;
    };

    const logout = async () => {

        await logoutUser();

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);