import { Component, OnInit } from '@angular/core';
import { User } from '../User.model';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();
  isLoginMode = true; // Initially in login mode
  // user = { email: '', password: '' }; // Object for login form data
  // newUser = { userName: '', email: '', password: '', contactNo: '' }; // Object for registration form data

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.authService.login(this.user).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          console.log('Login Successful!!!');
        } else {
          console.log('Login Failed');
          // alert('Invalid credentials. Please try again.');
        }
      }
    );
  }

  register(registerForm: NgForm) {
    this.authService.login(this.user).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          console.log('Login Successful!!!');
        } else {
          console.log('Login Failed');
        }
      }
    );
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode; // Toggle between login and registration modes
  }

}
