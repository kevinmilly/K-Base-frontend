import { ViewChild, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from 'src/app/global-layout/sidenav/sidenav.component';
import { SubSink } from 'subsink';
import { LoggedInUser } from './core/models/loggedInUser.model';
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

  
  private subs = new SubSink();

  userIsAuthenticated = false;
  loggedInUser:LoggedInUser = {name:'', email:''};

  constructor(private authService:AuthService) {
 
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.subs.sink = this.authService
    .getAuthStatus()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.loggedInUser = this.authService.getUser();
      this.loggedIn = true;
    })
  }

  toggleSideNav() {
    this.sidenavComponent.sidenav.toggle();
  }

  ngOnDestroy() { this.subs.unsubscribe();}
}
