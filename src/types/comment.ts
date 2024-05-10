export interface CommentType {
  commentId?: string;
  content: string;
  createAt: Date;
  projectId: string;
  user: {
    userId?: string;
    fullName?: string;
    email?: string;
    avatar: string;
    phoneNumber: string;
  };
  project: {
    title: string;
  };
}
