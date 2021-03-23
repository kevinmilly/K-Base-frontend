export interface IControlModel {
    name:string, 
    type:string, 
    required:boolean, 
    default:any,
    numberMax?:number,
    numberMin?:number,
    stringChoices?:string[],
  };