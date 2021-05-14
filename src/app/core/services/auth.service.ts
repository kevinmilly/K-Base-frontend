import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { environment } from "../../../environments/environment";
import { Auth } from "../models/auth.model";
import { LoggedInUser } from "../models/loggedInUser.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string =';'
    private authStatusListener = new Subject<boolean>();
    private user:LoggedInUser = {name: '', email:''}
    apiUrl:string = environment.apiUrl;

    

    constructor(private http:HttpClient) {}

    createUser(name:string, email:string, password:string) {
        const authData:Auth = {name:name, email:email, password:password};
        const url = `${this.apiUrl}/api/user/signup`;
        this.http.post(url, authData)
            .subscribe( response => {
                console.log(response);
            })
    }

    loginUser(email:string, password:string) {
        this.http.post<{token:string, user:LoggedInUser}>(`${this.apiUrl}/api/user/login`, {email:email, password:password})
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                this.authStatusListener.next(true);
                this.user = response.user;
            })
    }

    getToken() { return this.token };
    getAuthStatus() { return this.authStatusListener.asObservable() };
    getUser() {return this.user;}

}