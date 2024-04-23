import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const fetchHandlers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/handlers`);
    return res.data;
  } catch (error) {
    console.log("Error fetching data from backend", error);
    throw error;
  }
};
