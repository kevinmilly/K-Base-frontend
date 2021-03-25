export interface IConcept {
    _id?:string;
    title:string;
    necessity:number;
    dependentConcepts:string[];
    relatedNotes:string[];
    lastRecalled:string;
    level:number;
    completed:boolean;
    tag:string;
    details:string;
}
  