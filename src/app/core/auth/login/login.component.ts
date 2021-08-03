import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../../models/interfaces/auth.model';
import { IControlModel } from '../../models/control.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'kb-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  signup: boolean = true;
  @Output() loggedIn = new EventEmitter();

  loginControls: IControlModel[] = [
    {
      name: "Email",
      type: "email",
      required: true,
      default: '',

    },
    {
      name: "Password",
      type: "password",
      required: true,
      default: '',
    }
  ];

  signUpControls: IControlModel[] = [
    {
      name: "Name",
      type: "string",
      required: true,
      default: '',

    },
    {
      name: "Email",
      type: "email",
      required: true,
      default: '',

    },
    {
      name: "Password",
      type: "password",
      required: true,
      default: '',
    }
  ];

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  onSignup(event: Auth) {

    this.authService.createUser(event.name, event.email, event.password)
  }

  onLogin(event: {email:string, password:string}) {
    this.authService.loginUser(event.email,event.password);
  }

}
