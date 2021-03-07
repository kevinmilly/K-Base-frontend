export interface ITask {
    id:string;
    title:string;
    progress:number;
    relatedMilestone:string; 
    completed:boolean;
    resourceLink:string;
}
