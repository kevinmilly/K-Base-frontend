import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kb-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() selectedIndex:number=0;;

  constructor() { }

  ngOnInit(): void {
  }

}
