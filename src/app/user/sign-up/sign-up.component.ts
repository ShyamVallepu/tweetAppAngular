import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserRequest/user';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  userName: any;

  form = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    userName: new FormControl('', {
      validators: [Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
    }),
    dob: new FormControl("", Validators.required),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)]
    }),
    contactNumber: new FormControl("",  {
      validators: [Validators.required, Validators.minLength(10)]
    }),
  });


  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  signUp() {
      this.user = new User();{
      this.user.firstName = this.form.value.firstName;
      this.user.lastName = this.form.value.lastName;
      this.user.email = this.form.value.userName;
      this.user.DOB = this.form.value.dob;
      this.user.password = this.form.value.password;
      this.user.contactNumber = this.form.value.contactNumber;
    };
    //console.log(this.user)
    this.userService.userCreate(this.user).subscribe(
      (response: User) => {
        this.user = response;
        if(this.user !== null){
          alert("User SignUp Successfull")
          this.router.navigate(['sign-in']);
        }
      }
    )
  }
}
