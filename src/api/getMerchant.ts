import ENV from "@/constants/env";


export const getMerchant = async (merchantId: string, accessToken: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/merchants/${merchantId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getMerchant:", error);
    return null;
  }
};