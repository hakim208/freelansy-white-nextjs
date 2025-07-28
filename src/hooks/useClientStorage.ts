import { useState, useEffect } from "react";

export const useClientStorage = () => {
  const [id, setId] = useState<string | null>(null);
  const [roleUser, setRoleUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("acssec_token");
      const role = localStorage.getItem("roleUser");
      setId(token);
      setRoleUser(role);
    }
  }, []);

  return { id, roleUser };
};
