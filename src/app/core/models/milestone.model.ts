export interface IMilestone {
    id:string;
    title:string;
    progress:number;
    relatedTasks:string[];
    completed:boolean;
}
