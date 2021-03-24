export interface ITask {
    _id:string;
    title:string;
    resource:string;
    difficulty:number;
    dependentTasks:string[];
    lastRecalled:string[];
    status:number;
    completed:boolean;
    tag:string;
}
