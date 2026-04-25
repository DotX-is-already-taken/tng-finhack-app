import ENV from "../constants/env";

export const getAuth = async (phone: string , password: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching auth: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getAuth:", error);
    throw error;
  }
};

export const getUser = async (accessToken: string, userId: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/users/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching user data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
};
