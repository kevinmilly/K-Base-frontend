import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'difficultyStatus'
  })
  export class DifficultyPipe implements PipeTransform {
    transform(value:number, type:string): any {
      console.dir(arguments);
      return "difficulty" === type ? difficulty[value] : status[value];
    }
  }

  const difficulty:string[] = [
    "Cake",
    "Average",
    "Formiddable",
    "Impossible"
  ]

  const status:string[] = [
    "Not Started",
    "In Progress",
    "Done"
  ]