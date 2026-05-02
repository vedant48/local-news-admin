import { DataProvider } from "@refinedev/core";

const API_URL = "https://walrus-app-ygv8l.ondigitalocean.app";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token.trim() : "";
};

export const dataProvider: DataProvider = {
  getList: async ({ resource }) => {
    const res = await fetch(`${API_URL}/${resource}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Error");

    const data = await res.json();

    return {
      data,
      total: data.length,
    };
  },

  create: async ({ resource, variables }) => {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(variables),
    });

    if (!res.ok) throw new Error("Error");

    const data = await res.json();

    return { data };
  },

  // minimal required methods
  getOne: async () => ({ data: { id: "" } as any }),
  update: async () => ({ data: { id: "" } as any }),
  deleteOne: async () => ({ data: { id: "" } as any }),
  getApiUrl: () => API_URL,
};
