import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from 'src/app/global-layout/sidenav/sidenav.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;

  @ViewChild(SidenavComponent)
  sidenavComponent:any;

  constructor(private authService:AuthService) {
 
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  toggleSideNav() {
    this.sidenavComponent.sidenav.toggle();
  }
}
