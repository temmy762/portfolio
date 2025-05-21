export type Project = {
  id: string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  date: string;
  techStack: string[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
  date: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
};

export type Skill = {
  name: string;
  level: number; // 1-100
  icon?: string;
  category: 'frontend' | 'backend' | 'mobile' | 'other';
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  skills: string[];
};

export type Education = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
};

export type GithubRepo = {
  id: string;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  language?: string;
  fork: boolean;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
