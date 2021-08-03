export interface Concept {
    _id?: string;
    title: string;
    necessity: number;
    relatedNotes: string[];
    lastRecalled: string;
    level: number;
    tag: string;
}
