import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/localStorage";

type DecodedToken = {
  id: string;
  name: string;
  role: "ADMIN" | "CUSTOMER";
};

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Função para carregar tokens do localStorage
  const loadTokens = useCallback(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN);
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);

    if (storedAccessToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedAccessToken);
        setUser(decoded);
      } catch (error) {
        console.error("Erro ao decodificar access token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Função de logout
  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  // Quando o hook é montado, carrega os tokens
  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  return {
    accessToken,
    refreshToken,
    user,
    logout,
  };
}
