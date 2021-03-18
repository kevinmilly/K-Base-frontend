export interface IConcept {
    _id?:string;
    title:string;
    resource:string;
    difficulty:number;
    dependentConcepts:string[];
    relatedNotes:string[];
    lastRecalled:string;
    status:number;
    completed:boolean;
}
