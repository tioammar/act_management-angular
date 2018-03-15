import { User } from './user';

export interface Activity {
  id: number;
  activity: string;
  subunit: string;
  pic: User[];
  deadline: string;
  status: string;
  note: string;
}