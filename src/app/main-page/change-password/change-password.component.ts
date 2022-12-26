import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userName: string = localStorage.getItem('currentUser');
  username = this.userName.replace('"', '').replace('"', '');

  changePassword = new FormGroup({
    newpassword: new FormControl('',[Validators.required]),
      repassword: new FormControl('',[Validators.required])
    });
  newPassword: string;
  rePassword: string;
  changeStatus :Boolean;
 
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  changePW()
{
  this.newPassword = this.changePassword.value.newpassword;
  this.rePassword = this.changePassword.value.repassword;

  if(this.newPassword === this.rePassword){
      this.userService.changePassword(this.username,this.newPassword).subscribe();
      alert("Passwords changed successfully");
  }
  else{
    alert("Passwords not matching")
  }
  
}


}
