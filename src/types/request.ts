export interface RequestToJoin {
  requestToJoinId: string;
  createAt: string | Date;
  confirmAt?: string | Date;
  workplace: {
    workplaceId: string;
    name: string;
  };
  status: string;
  petitionerToUser: {
    avatar: string;
    userId: string;
    fullName: string;
    email: string;
  };
  confirmByIdToUser: {
    userId: string;
    fullName: string;
    email: string;
  };
}
