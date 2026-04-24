import ENV from "../constants/env";

export const getTenants = async (userId: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/users/${userId}/tenants`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching tenants: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getTenants:", error);
    throw error;
  }
};
