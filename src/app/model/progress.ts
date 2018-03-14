import { User } from './user';

export interface Progress {

  no: number;
  id: number;
  progress: string;
  pic: User;
  activity: number;
  pdate: string;
}