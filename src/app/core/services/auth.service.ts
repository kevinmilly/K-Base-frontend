import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
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
    private tokenTimer: any;

    private user:LoggedInUser = {name: '', email:''};
    apiUrl:string = environment.apiUrl;

    

    constructor(private http:HttpClient, private router: Router) {}

    createUser(name:string, email:string, password:string) {
        const authData:Auth = {name:name, email:email, password:password};
        const url = `${this.apiUrl}/api/user/signup`;
        this.http.post(url, authData)
            .subscribe( response => {
                console.log(response);
            })
    }

    loginUser(email:string, password:string) {
        this.http.post<{token:string, user:LoggedInUser, expiresIn:number}>(`${this.apiUrl}/api/user/login`, {email:email, password:password})
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if(token) {
                    this.user = response.user;

                    const expiresIn = response.expiresIn;
                    this.setAuthTimer(expiresIn);
                    const now = new Date().getTime();
                    this.saveAuthData(
                        token, 
                        new Date(now + expiresIn *1000),
                        response.user.name,
                        response.user.email
                        );
                    
                    this.authStatusListener.next(true);
                    this.router.navigate(['/']);
                }
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation) return;
        const now = new Date();
 
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn > 0) {
            this.token = authInformation.token;
            this.user = {name: authInformation.name, email:authInformation.email} as LoggedInUser
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
        
        
    }

    logout() {
        this.token = '';
        this.user = {name: '', email:''};
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    getToken() { return this.token };
    getAuthStatus() { return this.authStatusListener.asObservable() };
    getUser() {return this.user;}

    private setAuthTimer(expiresIn:number) { this.tokenTimer = setTimeout(() => this.logout(), expiresIn * 1000);}

    private saveAuthData(token: string, expirationDate: Date, name:string, email:string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    }

    private getAuthData(): {token:string, expirationDate:Date, name:string | null, email:string | null} | null {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if(!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        }
    }

}