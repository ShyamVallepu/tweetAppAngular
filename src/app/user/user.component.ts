import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/UserRequest/user';
import { UserService } from '../service/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User | undefined;
  constructor(private userService: UserService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  public getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (response: User) => {
        this.user = response;
      },   
    )
  }

}
