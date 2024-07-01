export interface TSkill {
  id: string;
  name: string;
  icon: string;
  level: string;
  skillCategory: TSkillCategory;
  skillCategoryId: string;
}

export interface TSkillCategory {
  id: string;
  name: string;
}

export enum SkillLevel {
  Junior = "Junior",
  Intermediate = "Intermediate",
  Expert = "Expert",
}
