import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  name: string;
  role: "ADMIN" | "CUSTOMER";
};

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Função para carregar tokens do localStorage
  const loadTokens = useCallback(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

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
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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
