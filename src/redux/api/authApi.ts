import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: `/change-password`,
        method: "POST",
        data: passwordData,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = userApi;
