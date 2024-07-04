import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });

    const [id, setId] = useState(() => {
        return JSON.parse(localStorage.getItem('id')) || null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User:', user);
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (id) {
            localStorage.setItem('id', JSON.stringify(id));
            console.log('User ID:', id);
        } else {
            localStorage.removeItem('id');
        }
    }, [id]);

    return (
        <UserContext.Provider value={{ user, setUser, id, setId}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
