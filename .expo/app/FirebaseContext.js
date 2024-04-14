// FirebaseContext.js

import React, { createContext, useContext } from 'react';

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children, value }) => (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
);