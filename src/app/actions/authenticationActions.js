export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export function handleLogin(currentUser) {
  return { type: LOGIN, payload: { currentUser } };
} 

export function handleLogout() {
  return { type: LOGOUT, payload: {} };
}

export function setToken(token) {
  return { type: SET_TOKEN, payload: { token } };
}