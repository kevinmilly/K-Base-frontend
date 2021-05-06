import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kb-popup-example',
  template: `
    <div class="example-container">
        <mat-card>
          <img src="{{gifImage}}" alt="Example instructional gif">
        </mat-card>
    </div>
  `,
  styleUrls: ['./popup-example.component.scss']
})
export class PopupExampleComponent implements OnInit {

  @Input() gifImage:string = '';

  constructor() { }

  ngOnInit(): void {

  }

}
