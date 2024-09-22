import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode=false;
  users:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   this.getUsers();
  }

 
   resgister(){
     this.registerMode = !this.registerMode;
   }

   getUsers(){
    this.http.get<any[]>('http://localhost:5000/api/users').subscribe({
      next:response => this.users = response,
      error:error=>console.log(error),
      complete:() =>console.log("completed")
     })
  }

  canceluser(event:boolean){
    this.registerMode = event;
  }
   
}
