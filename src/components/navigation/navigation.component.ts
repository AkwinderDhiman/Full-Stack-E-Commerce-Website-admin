import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authKey: any;
  // btnName: any = 'SignUp';
  ngOnInit() {
    this.authKey = localStorage.getItem('auth');
    console.log(this.authKey);
    
    // if (this.authKey) {
    //   this.btnName = "Login"
    // }
    // this.btnName = 'SignUp';
  }
}
