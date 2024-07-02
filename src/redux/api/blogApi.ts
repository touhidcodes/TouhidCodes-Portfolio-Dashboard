import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => ({
        url: `/blog`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    createBlog: build.mutation({
      query: (blogData) => ({
        url: `/blog`,
        method: "POST",
        data: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateBlog: build.mutation({
      query: ({ blogId, blogData }) => ({
        url: `/blog/${blogId}`,
        method: "PUT",
        data: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
