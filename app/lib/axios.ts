import axios from "axios";

export const graphqlApi = axios.create({
  baseURL: "https://graphqlzero.almansi.me/api",
});
