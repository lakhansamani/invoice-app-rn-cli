import React, {createContext, useEffect, useState} from 'react';
import {Spinner} from '@gluestack-ui/themed';
import storage from '../config/storage';

interface AuthData {
  token: string;
  email: string;
  id: string;
}
export const AuthContext = createContext({
  authData: {
    token: '',
    email: '',
    id: '',
  },
  setAuthData: (authData: AuthData) => {
    console.log(authData);
  },
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: '',
    email: '',
    id: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isComponentMounted = true;
    const getAuthData = async () => {
      try {
        const res = await storage.load({
          key: 'authData',
          autoSync: true,
          syncInBackground: true,
        });
        if (!isComponentMounted) {
          return;
        }
        if (res) {
          setAuthData(res as AuthData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAuthData();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  const handleSetAuthData = async (authData: AuthData) => {
    await storage.save({
      key: 'authData',
      data: authData,
    });
    setAuthData(authData);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData: handleSetAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
