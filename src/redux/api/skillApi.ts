import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSkills: build.query({
      query: () => ({
        url: `/skill`,
        method: "GET",
      }),
      providesTags: [tagTypes.skill],
    }),

    createSkill: build.mutation({
      query: (skillData) => ({
        url: `/skill`,
        method: "POST",
        data: skillData,
      }),
      invalidatesTags: [tagTypes.skill],
    }),
    updateSkill: build.mutation({
      query: ({ skillId, skillData }) => ({
        url: `/skill/${skillId}`,
        method: "PUT",
        data: skillData,
      }),
      invalidatesTags: [tagTypes.skill],
    }),
    deleteSkill: build.mutation({
      query: (skillId) => ({
        url: `/skill/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skill],
    }),
  }),
});

export const {
  useGetAllSkillsQuery,
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;
