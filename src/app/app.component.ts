
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_service/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Dating App';
  users : any[] = [];
   constructor(private accountService:AccountService){

   }
  ngOnInit(): void {
   
     this.setcurrentUser();
  }
 

  setcurrentUser(){
    const userstring = localStorage.getItem('user');
    if(!userstring) return;
    const user:User = JSON.parse(userstring);
    this.accountService.setCurrentUser(user);
  }
   
}
