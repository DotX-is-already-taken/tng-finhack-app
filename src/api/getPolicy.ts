import ENV from "../constants/env";

export const getPolicyGroups = async (pool_id: string) => {
  try {
    const url = `${ENV.API_BASE_URL}pools/${pool_id}/policy-groups`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching policy data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getPolicyGroups:", error);
    throw error;
  }
};
