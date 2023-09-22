import { createContext, useState, useContext } from "react";



const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    jwt: null,
    user_id: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext);
}
