import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../shared/utils/base_url";

// Create a baseQuery instance without authentication
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    headers.set("x-voms-client-key", "frontend-app");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  tagTypes: [
  ],
  endpoints: () => ({}),
});
