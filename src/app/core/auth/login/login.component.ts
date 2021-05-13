import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IControlModel } from '../../models/control.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  submit(event: Event) {
    console.log("Submit hit");
    this.loggedIn.emit("loggedIn");
  }

}
