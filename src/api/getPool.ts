import ENV from "../constants/env";

export const getUserPool = async (userId: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/users/${userId}/pool`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching user pool: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getUserPool:", error);
    throw error;
  }
};
