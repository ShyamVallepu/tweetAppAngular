import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/UserRequest/login';
import { UserService } from 'src/app/service/UserService';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  logInStatus?: Boolean;

  userModel = new Login('','');
  msg: string = ''
  fieldErrors: string[] = []

  
  loginUser = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]}),
      password: new FormControl('', {
      validators:  [Validators.required,Validators.minLength(8)]})
    });
 

  constructor( private http: HttpClient, private userService: UserService, private route: ActivatedRoute, private router: Router,private authService :AuthService) { 
  }
  ngOnInit(): void {
  }

  login() {
    this.userModel.username=this.loginUser.value.username;
    this.userModel.password = this.loginUser.value.password;
    //console.log(this.userModel);
    this.userService.userLogin(this.userModel).subscribe(
      response => {
        //this.logInStatus = response;
        this.userService.setSession(response);
        //if(this.logInStatus){
          localStorage.setItem("currentUser",JSON.stringify(this.loginUser.value.username));
          this.router.navigate(['mainPage']);
        //}
        //else if(this.logInStatus === false){
            //alert("Invalid LogIn Credentials"); 
        //}
      },error=>{
        try{
          this.fieldErrors=JSON.parse(error.error).fieldErrors;
          alert(this.fieldErrors);
        }catch(error){
          alert("Invalid LogIn Credentials");
        }

      }
    )
  }

}
