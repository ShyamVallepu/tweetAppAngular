import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/UserService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]})
    });
 
  constructor(private userService:UserService ,private router:Router) { }

  ngOnInit(): void {
  }

  forgotpw(){
    this.userService.forgotPassword(this.forgotPassword.value.username).subscribe(
      (response: any) => {
        console.log(response)
        if(response){
          alert("UserName Deleted Sign Up again with same username")
          this.router.navigate(['sign-up']);
        }
        else{
          alert("UserName not Found")
        }
      }
    )
  }

}
