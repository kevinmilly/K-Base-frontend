import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'kb-popup-example',
  template: `
    <div class="example-container">
    
          <img src="{{gifImage}}" alt="Example instructional gif">
    
    </div>
  `,
  styleUrls: ['./popup-example.component.scss']
})
export class PopupExampleComponent implements OnInit {

  @Input() gifImage:string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data:string) { }

  ngOnInit(): void {
    this.gifImage = this.data;
  }

}
