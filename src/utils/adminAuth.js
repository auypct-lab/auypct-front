export const setAuth = (token) => localStorage.setItem("auypct_token", token);
export const getAuth = () => localStorage.getItem("auypct_token");
export const clearAuth = () => localStorage.removeItem("auypct_token");
export const isAuthed = () => Boolean(getAuth());