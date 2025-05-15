import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native';
import axios from 'axios';
import { API } from '@/constants/api';

export interface AuthContextType {
    accessToken: string | undefined;
    login: (access: string, refresh: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    const login = async (access: string, refresh: string) => {
        setAccessToken(access);
        SecureStore.setItemAsync('accessToken', access);
        SecureStore.setItemAsync('refreshToken', refresh);
    };

    const logout = async () => {
        setAccessToken(undefined);
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        console.log("Logged out");
        Alert.alert("Đăng xuất", "Bạn đã đăng xuất thành công.");
    }

    const refreshToken = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) {
                await logout();
                return null;
            }

            try {
                const res = await axios.put(API.refreshToken, {},
                    {
                        headers: { Authorization: `Bearer ${refreshToken}` }
                    });

                const accessToken = res.data?.accessToken;
                if (accessToken) {
                    setAccessToken(accessToken);
                    return accessToken;
                } else {
                    await logout();
                    return null;
                }
            } catch (error: any) {
                console.error("Token refresh error:", error?.response || error.message);
                Alert.alert("Lỗi", "Không thể làm mới phiên đăng nhập.");
                await logout();
                return null;
            }

        } catch (error) {
            console.error('Error refreshing token:', error);
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};