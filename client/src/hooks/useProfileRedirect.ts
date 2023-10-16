import { useEffect, useState } from "react";
import axios from "axios";

type ProfileData = {
  status: string;
  user_details: {
    email: string;
    username: string;
  };
};

export const useProfileRedirect = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProfileData | null>(null);
  const [authStatus, setAuthStatus] = useState<
    "authenticated" | "unauthenticated" | null
  >(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token?.trim()) {
        setAuthStatus("unauthenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/api/profile", {
          headers: { Authorization: token },
        });
        setData(response.data);
        setAuthStatus("authenticated");
      } catch (error) {
        console.error(error);
        setAuthStatus("unauthenticated");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { loading, data, authStatus };
};
