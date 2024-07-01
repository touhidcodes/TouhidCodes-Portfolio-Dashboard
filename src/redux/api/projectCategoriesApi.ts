import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const projectCategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProjectCategories: build.query({
      query: () => ({
        url: `/project-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.projectCategories],
    }),

    createProjectCategory: build.mutation({
      query: (categoryData) => ({
        url: `/project-category`,
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags: [tagTypes.projectCategories],
    }),

    deleteProjectCategory: build.mutation({
      query: (categoryId) => ({
        url: `/project-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.projectCategories],
    }),
  }),
});

export const {
  useCreateProjectCategoryMutation,
  useGetAllProjectCategoriesQuery,
  useDeleteProjectCategoryMutation,
} = projectCategoriesApi;
