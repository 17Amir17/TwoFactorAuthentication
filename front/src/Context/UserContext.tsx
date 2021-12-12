import React, { createContext, useState, FC } from 'react';
import { User, UserContextType } from '../Services/types';

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User>();
  const [image, setImage] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [online, setOnline] = useState<boolean>();

  const clearContext = () => {
    setUser(undefined);
    setImage(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        image,
        setImage,
        clearContext,
        online,
        setOnline,
        username,
        setUsername,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
