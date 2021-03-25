export interface ITask {
    _id:string;
    title:string;
    difficulty:number;
    lastRecalled:string[];
    status:number;
    completed:boolean;
    tag:string;
}
