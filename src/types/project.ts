import {PayloadFileType, TaskType} from '.';

export interface ProjectType {
  projectId?: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  createById?: string;
  tasks: TaskType[];
  statusId: string;
  document: PayloadFileType[];
  member: string[];
  status: {
    statusId: string;
    name: string;
  };
  memberProject: Member[];
}

export interface Member {
  userId: string;
}
