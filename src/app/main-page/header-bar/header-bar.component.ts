import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor(private router: Router,private authService :AuthService) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.authService.logout();
    this.router.navigate(['']);
    
  }

}
