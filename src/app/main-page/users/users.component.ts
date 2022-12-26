import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/UserRequest/user';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User | undefined;
  searchText;
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
