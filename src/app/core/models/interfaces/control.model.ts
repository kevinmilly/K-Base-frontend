import { Observable } from "rxjs";

export interface CustomControl {
  name: string;
  type: string;
  required: boolean;
  default: any;
  numberMax?: number;
  numberMin?: number;
  stringChoices?: any[]
  autoCompleteOptions?: Observable<any[]>;
};