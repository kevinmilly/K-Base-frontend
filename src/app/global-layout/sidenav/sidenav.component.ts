import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoggedInUser } from 'src/app/core/models/loggedInUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'kb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav:any;
  @Output() onLogout = new EventEmitter();
  @Output() loggedIn = new EventEmitter();

  private subs = new SubSink();

  userIsAuthenticated = false;
  loggedInUser:LoggedInUser = {name:'', email:''};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subs.sink = this.authService
    .getAuthStatus()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.loggedInUser = this.authService.getUser();
      this.loggedIn.emit("logged in");
    })
  }

  toggle() {
    this.sidenav.toggle()
  }

  logout() { 
    this.authService.logout();
    this.onLogout.emit("logged out");
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
