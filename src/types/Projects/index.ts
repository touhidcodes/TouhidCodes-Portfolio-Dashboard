export type TProjectCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  frontEndGithubLink: string;
  backEndGithubLink: string;
  frontEndLiveLink: string;
  backEndLiveLink: string;
  details: string;
  thumbnail: string;
  fullImage: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  categoryId: string;
  category: TProjectCategory;
};
