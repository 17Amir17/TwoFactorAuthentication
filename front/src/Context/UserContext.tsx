import React, { createContext, useState, FC } from 'react';
import { User, UserContextType } from '../Services/types';

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
