import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'kb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.clicked.emit("sidenav toggled from toolbar");
  }

}
