interface UserPerform {
  fullName: string;
  email: string;
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
  projectId?: string;
  performById: string | number;
  status?: {
    statusId: string;
    name: string;
  };
  userPerformTask?: UserPerform;
}
