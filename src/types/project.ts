import {PayloadFileType, TaskType} from '.';
import {CommentType} from './comment';

export interface ProjectType {
  projectId?: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  createById?: string;
  tasks: TaskType[];
  document: PayloadFileType[];
  member: string[];
  status: {
    statusId: string;
    name: string;
  };
  comment: CommentType[];
  memberProject: Member[];
}

export interface Member {
  userId: string;
}
