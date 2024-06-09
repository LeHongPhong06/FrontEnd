export interface UserType {
  dataTaskStatistic: any;
  user: any;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  workplace: {
    name: string;
    workplaceId: string;
  };
  roleId: string;
}
export interface AdminUpdateUser {
  fullName: string;
  phoneNumber: string;
  workplaceId: string;
  password: string;
}

export interface UserFilterPagination {
  page?: number;
  limit?: number;
  search?: string;
}
