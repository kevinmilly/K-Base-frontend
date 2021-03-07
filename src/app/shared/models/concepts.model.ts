export interface IConcept {
    _id:string;
    title:string;
    progress:number;
    relatedConcepts:string[];
    relatedNotes:string[];
    milestones:string[];
    lastRecalled:string;
    status:number;
}
