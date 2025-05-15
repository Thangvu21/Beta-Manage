import { MovieData } from '@/constants/film';
import React, { createContext, useContext, useState } from 'react';

interface MovieContextType {
    listMovie: MovieData[];
    setListMovie: React.Dispatch<React.SetStateAction<MovieData[]>>;
}

const MovieContext = createContext<MovieContextType | null>(null);

interface MovieProviderProps {
    children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [listMovie, setListMovie] = useState<MovieData[]>([]);

    return (
        <MovieContext.Provider value={{ listMovie, setListMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};