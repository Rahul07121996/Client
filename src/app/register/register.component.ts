
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AccountService } from '../_service/account.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  model:any={};

  
  @Output() cancelancelRegister = new EventEmitter<boolean>();
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  resgister(){
     this.accountService.register(this.model).subscribe({
      next:Response=>{
        console.log(Response);
        this.cancel();

      },
      error:error=>console.log(error)
     })
  }
  
  cancel(){
    this.cancelancelRegister.emit(false);
  }
   
}
