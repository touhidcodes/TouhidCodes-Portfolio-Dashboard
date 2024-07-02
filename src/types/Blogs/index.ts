export type TBlog = {
  id: string;
  thumbnail?: string;
  title: string;
  content: string;
  category: TBlogCategory;
  categoryId: string;
  published: boolean;
};

export type TBlogCategory = {
  id: string;
  name: string;
};
