import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'difficultyStatus'
  })
  export class DifficultyPipe implements PipeTransform {
    transform(value:number, type:string): any {
      console.dir(arguments);
      return "difficulty" === type ? difficulty[value] : necessity[value];
    }
  }

  const difficulty:string[] = [
    "Nincompoop",
    "Beginner",
    "Intermediate",
    "Expert",
    "1%"
  ]

  const necessity:string[] = [
    "Frivolous",
    "Somewhat Useful",
    "Very Useful",
    "Need to Know"
  ]

