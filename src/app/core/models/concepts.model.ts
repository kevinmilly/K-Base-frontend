export interface IConcept {
    _id:string;
    title:string;
    difficulty:number;
    relatedConcepts:string[];
    relatedNotes:string[];
    milestones:string[];
    lastRecalled:string;
    status:number;
}
