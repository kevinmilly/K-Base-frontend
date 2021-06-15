import { Pipe, PipeTransform } from "@angular/core";
import { Level, Necessity } from "src/app/core/models/factors.enum";

@Pipe({
    name: 'levelStatus'
  })
  export class LevelPipe implements PipeTransform {
    transform(value:number, type:string): any {
      return "level" === type ? level[value] : necessity[value];
    }
  }

  const level:string[] = [
    Level[0],
    Level[1],
    Level[2], 
    Level[3],
    Level[4]
  ]

  const necessity:string[] = [
    Necessity[0],
    Necessity[1],
    Necessity[2],
    Necessity[3]
  ]

