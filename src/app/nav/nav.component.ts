import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Observable } from 'rxjs'
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})




export class NavComponent implements OnInit {



  model:any= {};
  loggedIn = false;
  currentUser$!: Observable<User | null>;
  constructor(public accountService:AccountService,private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
     this.currentUser$ = this.accountService.currentUser$;
     
  }

 
  
  login(){
     this.accountService.login(this.model).subscribe({
       next:response=>{
        
        this.model = {};
        this.toastr.success('SuccesFully Login');
        this.router.navigateByUrl('/members')
         
       },
       error:error=> {
        
        console.log(error);
       }
     })
  }

  logOut(){
     this.accountService.logout();
     this.router.navigateByUrl('/');
  }



}
