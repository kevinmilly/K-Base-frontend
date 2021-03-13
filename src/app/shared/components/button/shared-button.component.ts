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

  @Input() type: string = 'regular';
  @Input() size: string = 'reg';
  @Input() content: string = '';

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
