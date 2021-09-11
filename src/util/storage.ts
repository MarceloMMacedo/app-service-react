
import jwtDecode from 'jwt-decode';
const tokenKey = 'authData';
const tokenUser = 'authDataUser';



type LoginResponse = {
  sub: string,
  role: string,
  financeiro: boolean,
  estoque: boolean,
  servico: boolean,
  exp: number
};

export const saveAuthData = (obj: string) => {
  localStorage.setItem(tokenUser, JSON.stringify(jwtDecode(obj)));
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as  string;
};
export const getAuthDataUser = () => {
  const str = localStorage.getItem(tokenUser) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
