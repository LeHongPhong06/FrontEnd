export interface UserType {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  workplace: {
    name: string;
    workplaceId: string;
  };
}

export interface UserFilterPagination {
  page?: number;
  limit?: number;
  search?: string;
}
