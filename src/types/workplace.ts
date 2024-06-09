import {UserType} from './user';

export interface WorkplaceType {
  workplaceId: string;
  name: string;
  logo?: string;
  total: number;
  leader: UserType;
  users: UserType[];
}

export interface AddMember {
  workplaceId: string;
  email: string;
}
