import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const fetchIssues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/issue`);
    return response.data;
  } catch (error) {
    console.log("Error fecthing Data>> ", error);
    throw error;
  }
};

export const deleteIssue = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/issue/${id}`);
    console.log(id, "deleted");
    return response.data;
  } catch (error) {
    console.log("Error Deleteing Data>> ", error);
    throw error;
  }
};

export const updateIssue = async (id, technician, assignDate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/issue/${id}?technician=${technician}&issueAssigned=${assignDate}`
    );
    console.log(
      `${BASE_URL}/issue/${id}?technician=${technician}&issueAssigned=${assignDate}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error UPDATING Data >> ", error);
    throw error;
  }
};
