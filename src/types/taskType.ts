export interface TaskType {
  taskId: string;
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  priority: string;
  projectId?: string;
  performById: string | number;
  createById: string;
  statusId?: string;
}
