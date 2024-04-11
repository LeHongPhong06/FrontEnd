import {PayloadFileType, TaskType} from '.';

export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegister {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  gender: string;
}

export interface AuthChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateInfoUser {
  fullName: string;
  phoneNumber: string;
}

export interface UpdateAvatarUser {
  avatar: string;
}

export interface WorkCreateType {
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
}
