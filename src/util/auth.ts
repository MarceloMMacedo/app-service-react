import jwtDecode from 'jwt-decode';
import { getAuthData, getAuthDataUser } from './storage';

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
  sub: string,
  role: string,
  financeiro: boolean,
  estoque: boolean,
  servico: boolean,
  exp: number
};

export const getTokenData = (): TokenData | undefined => {
  try {
     return jwtDecode(getAuthData()) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenData.role.includes(roles[i])) {
        return true;
      }
    }
    return roles.some(role => tokenData.role.includes(role));
  }

  return false;
};
