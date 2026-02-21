export type Theme = 'light' | 'dark';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface SystemInfo {
  [key: string]: string;
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';
