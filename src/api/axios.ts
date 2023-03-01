import axios from "axios";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`,
  },
});

export const axiosGet = instance.get;
