export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  profile_pic: string;
  is_staff: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  author: User;
  tags: string[];
  created_at: string;
  likes_count: number;
}

export interface Mumble {
  id: number;
  content: string;
  image: string;
  author: User;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

export interface Discussion {
  id: number;
  title: string;
  content: string;
  author: User;
  tags: string[];
  created_at: string;
  replies_count: number;
}
