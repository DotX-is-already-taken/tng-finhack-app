import ENV from "@/constants/env";

export const getTenantByTenantId = async (
  accessToken: string,
  tenantId: string,
) => {
  try {
    const url = `${ENV.API_BASE_URL}/tenants/${tenantId}/overview`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching tenant: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getTenantByTenantId:", error);
    throw error;
  }
};

export const getMasterPoliciesByTenantId= async (
  accessToken: string,
  tenantId: string,
) => {
  try {
    const url = `${ENV.API_BASE_URL}/tenants/${tenantId}/masterpolicy`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching tenant: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getTenantByTenantId:", error);
    throw error;
  }
};


export const getPoolsByTenantId= async (
  accessToken: string,  
  tenantId: string,
) => {
  try {
    const url = `${ENV.API_BASE_URL}/tenants/${tenantId}/pools`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching tenant: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getTenantByTenantId:", error);
    throw error;
  }
};


export const getTenantPoliciesByTenantId= async (
  accessToken: string,  
  tenantId: string,
) => {
  try {
    const url = `${ENV.API_BASE_URL}/tenants/${tenantId}/tenant-policies`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching tenant: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getTenantByTenantId:", error);
    throw error;
  }
};
