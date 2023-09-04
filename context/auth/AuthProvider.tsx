import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { AuthContext, authReducer } from './';

import Cookie from 'js-cookie';
import axios from 'axios';

import { IUser } from '../../interface';

import { tesloApi } from '../../api';
import { useRouter } from 'next/router';

export interface IRegisterUser {
  hasError: boolean;
  message?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if( status === 'authenticated'){
      console.log(data);
      dispatch({ type: 'Auth - Login', payload: data?.user as IUser });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {

    if(!Cookie.get('token')) return;

    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;
      Cookie.set('token', token, { sameSite: 'none', secure: true });
      dispatch({ type: 'Auth - Login', payload: user });
    } catch (error) {
      Cookie.remove('token');
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token, { sameSite: 'none', secure: true });
      dispatch({ type: 'Auth - Login', payload: user });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const registerUser = async (name: string, email: string, password: string): Promise<IRegisterUser> => {
    try {
      const { data } = await tesloApi.post('/user/register/', { name, email, password });
      const { token, user } = data;
      Cookie.set('token', token, { sameSite: 'none', secure: true });
      dispatch({ type: 'Auth - Login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }
      return {
        hasError: true,
        message: 'No se pudo crear el ususario - intente de nuevo',
      };
    }
  };

  const logout = () => {
    Cookie.remove ('cart'      );
    Cookie.remove ('firstName' );
    Cookie.remove ('lastName'  );
    Cookie.remove ('address'   );
    Cookie.remove ('address2'  );
    Cookie.remove ('zip'       );
    Cookie.remove ('city'      );
    Cookie.remove ('country'   );
    Cookie.remove ('phone'     );

    signOut();
    // Cookie.remove ('token'     );
    // router.reload();
  };

  const values = {
    ...state,
    loginUser,
    registerUser,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
