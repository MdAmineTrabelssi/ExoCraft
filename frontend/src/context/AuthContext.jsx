import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const CLASS_OPTIONS = [
  "1ère ingénieur",
  "2ème ingénieur",
  "3ème ingénieur",
  "4ème ingénieur",
  "5ème ingénieur",
];
export const SECTION_OPTIONS = ["Cloud", "Data Science", "Cyber Security", "Génie logiciel"];

function normalizeAssociations(associations) {
  if (!Array.isArray(associations)) return [];
  return associations.filter((item) => item?.className && item?.section)
    .map((item) => ({ className: String(item.className), section: String(item.section) }));
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("exocraft_user");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        return { ...parsed, associations: normalizeAssociations(parsed.associations) };
      } catch {
        localStorage.removeItem("exocraft_user");
      }
    }

    return null;
  });

  const login = (userData) => {
    const nextUser = {
      ...(user || {}),
      ...userData,
      associations: normalizeAssociations(userData.associations ?? user?.associations),
    };
    setUser(nextUser);

    localStorage.setItem(
      "exocraft_user",
      JSON.stringify(nextUser)
    );
  };

  const updateUser = (updates) => {
    const nextUser = {
      ...(user || {}),
      ...updates,
      associations: normalizeAssociations(updates.associations ?? user?.associations),
    };
    setUser(nextUser);
    localStorage.setItem("exocraft_user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("exocraft_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
