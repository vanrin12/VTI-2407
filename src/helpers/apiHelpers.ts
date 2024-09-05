const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

export const apiCall = async (
  url: string,
  method: string = "GET",
  data = {}
) => {
  try {
    const username = "admin";
    const password = "123456";
    const credentials = btoa(`${username}:${password}`);
    
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    };

    if (method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`${BASE_URL}${url}`, options);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || `Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
