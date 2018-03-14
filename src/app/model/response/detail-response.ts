import { Activity } from '../activity';
import { Progress } from '../progress';

export interface DetailResponse {

  activity: Activity;
  progress: Progress[];
}