import axios from "axios";
import * as process from "node:process";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

export const getRecentBlockList  = async () => {
  try {
    const response = await axios.get(`${API_URL}/recentBlockList`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getTransactionDetail = async (transactionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/tx/${transactionId}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getBlockDetail = async (slot: string) => {
  try {
    const response = await axios.get(`${API_URL}/block/${slot}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(`### error: ${JSON.stringify(error)}`);
    return null;
  }
};
