import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  isRejectedWithValue,
  type Middleware,
  type MiddlewareAPI,
} from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { isFetchBaseQueryError } from "../fetch_base_query_error";
import { logout } from "../../domains/auth/slices/auth.slice";
import { BASE_URL } from "../../shared/utils/base_url";
import type { RootState } from "../store";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload;

      if (isFetchBaseQueryError(error) && error.status === 401) {
        api.dispatch(logout());
        window.location.href = "/";
      }
    }
    return next(action);
  };

// Create a baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store or local storage, it's used for authenticated requests
    const token =
      (getState() as RootState).auth.token ||
      secureLocalStorage.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);

      headers.set("Accept", "application/json");
      // headers.set("Content-Type", "application/json; charset=UTF-8");
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  tagTypes: [
    "User",
    "Profile",
  ],
  endpoints: () => ({}),
});
