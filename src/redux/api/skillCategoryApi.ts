import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const skillCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSkillCategories: build.query({
      query: () => ({
        url: `/skill-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.skillCategories],
    }),

    createSkillCategory: build.mutation({
      query: (categoryData) => ({
        url: `/skill-category`,
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags: [tagTypes.skillCategories],
    }),

    deleteSkillCategory: build.mutation({
      query: (categoryId) => ({
        url: `/skill-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skillCategories],
    }),
  }),
});

export const {
  useCreateSkillCategoryMutation,
  useGetAllSkillCategoriesQuery,
  useDeleteSkillCategoryMutation,
} = skillCategoryApi;
