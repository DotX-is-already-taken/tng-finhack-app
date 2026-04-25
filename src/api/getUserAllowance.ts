import ENV from "../constants/env";
import { AllowanceDetails } from "@/types/allowance";

export const getAllowanceSummary = async (user_tenant_id: string, accessToken: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/allowance-summary?user_tenant_id=${user_tenant_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching allowance summary: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Allowance summary fetched successfully:", data);

    return data;
  } catch (error) {
    console.error("Error in getAllowanceSummary:", error);
    throw error;
  }
};


export const getAllowanceDetails = async (policy_group_id: string, accessToken: string, user_tenant_id: string) => {
  try {
    const url = `${ENV.API_BASE_URL}/allowance-detail?policy_group_id=${policy_group_id}&user_tenant_id=${user_tenant_id}`;
    console.log( `Fetching allowance details for policy_group_id: ${policy_group_id}, user_tenant_id: ${user_tenant_id}`, accessToken );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching allowance details: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const allowanceDetails: AllowanceDetails = {
      user_tenant_id: data.user_tenant_id,
      policy_group_id: data.policy_group_id,
      policy_group_name: data.policy_group_name,
      policy_group_description: data.policy_group_description,
      policy_group_status: data.policy_group_status,
      max_limit: data.max_limit,
      transactions: data.transactions.map((tx: any) => ({
        payment_id: tx.payment_id,
        merchant_id: tx.merchant_id,
        raw_vendor_name: tx.raw_vendor_name,
        amount: tx.amount,
        currency: tx.currency,
        payment_status: tx.payment_status,
        control_plane_payment_intent_id: tx.control_plane_payment_intent_id,
        created_at: tx.created_at,
      })),
    };

    console.log("Allowance details fetched successfully:", allowanceDetails);

    return allowanceDetails;
  } catch (error) {
    console.error("Error in getAllowanceDetails:", error);
    throw error;
  }
};