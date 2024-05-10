interface UserPerform {
  fullName: string;
  email: string;
  avatar?: string;
  userId: string;
  phoneNumber: string;
}

export interface TaskType {
  taskId: string;
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  priority: string;
  createAt: Date | string;
  statusId: string;
  performById: string | number;
  status: {
    statusId: string;
    name: string;
  };
  project: {
    projectId: string;
    createById: string;
    startDate: Date;
    endDate: Date;
    memberProject: User[];
  };
  userPerformTask: UserPerform;
}
export interface CreateTask {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  projectId: string;
  performById: string;
}
interface User {
  userId: string;
}
