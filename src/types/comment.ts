export interface CommentType {
  commentId?: string;
  content: string;
  createAt: Date;
  user: {
    userId?: string;
    fullName?: string;
    email?: string;
    avatar: string;
  };
  project: {
    projectId?: string;
    title: string;
  };
}
