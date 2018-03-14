import { User } from './user';

export interface Activity {

  no: number;
  id: number;
  activity: string;
  subunit: string;
  pic: User[];
  deadline: string;
  status: string;
  note: string;
}