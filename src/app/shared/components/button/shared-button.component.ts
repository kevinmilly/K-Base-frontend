import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kb-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss']
})
export class SharedButtonComponent implements OnInit {

  @Input() type: string;
  @Input() content: string;
  @Input() disabled: boolean;
  @Output() clicked;
  @Input() size: string;

  constructor() {
    this.type = 'regular';
    this.content = '';
    this.disabled  = false;
    this.clicked = new EventEmitter();
    this.size  = 'reg';
   }

  ngOnInit(): void {
   
  }
 
}
