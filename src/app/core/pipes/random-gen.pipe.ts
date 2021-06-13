import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomGen'
})
export class RandomGenPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return null;
  }

}
