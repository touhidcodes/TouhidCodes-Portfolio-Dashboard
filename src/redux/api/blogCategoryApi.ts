import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const blogCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogCategories: build.query({
      query: () => ({
        url: `/blog-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogCategories],
    }),

    createBlogCategory: build.mutation({
      query: (categoryData) => ({
        url: `/blog-category`,
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags: [tagTypes.blogCategories],
    }),

    deleteBlogCategory: build.mutation({
      query: (categoryId) => ({
        url: `/blog-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogCategories],
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useGetAllBlogCategoriesQuery,
  useDeleteBlogCategoryMutation,
} = blogCategoryApi;
