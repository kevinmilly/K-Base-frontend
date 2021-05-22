import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'kb-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav:any;
  @Output() onLogout = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.sidenav.toggle()
  }

  logout() { 
    this.authService.logout();
    this.onLogout.emit("logged out");
  }



}
