import { User } from './user';

export interface Progress {
  id: number;
  progress: string;
  pic: User;
  activity: number;
  pdate: string;
}