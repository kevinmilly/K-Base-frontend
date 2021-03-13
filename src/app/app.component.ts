import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from 'src/app/global-layout/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  @ViewChild(SidenavComponent)
  sidenavComponent: SidenavComponent = new SidenavComponent;

  constructor() {

  }

  ngOnInit() {

  }

  toggleSideNav() {
      this.sidenavComponent.sidenav.toggle();
  }
}
