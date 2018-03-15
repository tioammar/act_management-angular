import { Injectable } from "@angular/core";

@Injectable()
export class MainForm {
  constructor(){}

  public activity: string;
  public deadline: string;
  public pic: number[];
  public subunit: string;
  public note: string;
}