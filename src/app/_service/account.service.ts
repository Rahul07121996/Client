  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { map } from 'rxjs/operators';
  import { User } from '../_models/user';
  import { BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AccountService {
  private currentUsersource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUsersource.asObservable();

  baseUrl = "http://localhost:5000/api/";
    constructor(private http:HttpClient) { 
          
    }

    login(model:any){
        
      return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
        map((response:any)=>{
          const user = {
            ...response,
            username: response.userName // Mapping 'userName' from the API to 'username'
          };
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUsersource.next(user);
           
          }
          return user;
        })
      )
    }

    register(model:any){
      return this.http.post<User>(this.baseUrl + 'account/Register',model).pipe(
        map((response=>{
          const user = response;
          if(user){
            this.currentUsersource.next(user);
          }
          return user;
        }))
      )
    }
  
    setCurrentUser(user:User){
      this.currentUsersource.next(user);
    }
    
    logout(){
      localStorage.removeItem('user');
      this.currentUsersource.next(null);

    }

  }
