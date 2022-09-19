import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const TOKEN_KEY = '@scali-dictionary';

export const isAuthenticated = () => {
  const cookies = parseCookies();
  console.log('cukis', cookies[TOKEN_KEY])

  return !!cookies[TOKEN_KEY];
}

export const getToken = () => {
  const cookies = parseCookies();
  return cookies[TOKEN_KEY];
  // return localStorage.getItem(TOKEN_KEY);
}

export const login = (token: string) => {
  setCookie(null, TOKEN_KEY, token, {
    maxAge: 30 * 24 * 60 * 60
  });
  // localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
  destroyCookie(null, TOKEN_KEY);
  // localStorage.removeItem(TOKEN_KEY);
}