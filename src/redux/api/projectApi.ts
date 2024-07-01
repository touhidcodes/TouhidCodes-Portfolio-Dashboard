import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: () => ({
        url: `/project`,
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),

    createProject: build.mutation({
      query: (projectData) => ({
        url: `/project`,
        method: "POST",
        data: projectData,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    updateProject: build.mutation({
      query: ({ projectId, projectData }) => ({
        url: `/project/${projectId}`,
        method: "PUT",
        data: projectData,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    deleteProject: build.mutation({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.project],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
