import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggedInUser } from 'src/app/core/models/loggedInUser.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'kb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() clicked = new EventEmitter();
  
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
      })
      
  }

  onToggle() {
    this.clicked.emit("sidenav toggled from toolbar");
  }

  ngOnDestroy() { this.subs.unsubscribe();}

}
