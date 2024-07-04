import { baseApi } from "./baseApi";

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrUploadResume: build.mutation({
      query: (url) => ({
        url: `/resume`,
        method: "POST",
        data: url,
      }),
    }),
  }),
});

export const { useCreateOrUploadResumeMutation } = resumeApi;
