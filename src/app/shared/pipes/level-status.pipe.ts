import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'levelStatus'
  })
  export class LevelPipe implements PipeTransform {
    transform(value:number, type:string): any {
      return "level" === type ? level[value] : necessity[value];
    }
  }

  const level:string[] = [
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

