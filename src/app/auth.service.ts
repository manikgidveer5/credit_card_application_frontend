import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from './User.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private loggedIn = false;
  private apiUrl = 'http://localhost:8080/user';
  user: User = new User();

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(user: User): Observable<boolean> {
    if (user.email && user.password) {
      const params = new HttpParams()
        .set('email', user.email)
        .set('pass', user.password);
      return this.http
        .get<{ Result: string; Error?: string }>(`${this.apiUrl}/login`, {
          params,
        })
        .pipe(
          map((response) => {
            if (response.Result === 'Success') {
              console.log('Login Successful!!!');
              this.loggedIn = true;
              this.router.navigate(['/credit-card']);
              return true;
            } else {
              console.error('Login failed: ', response.Error);
              this.loggedIn = false;
              return false;
            }
          }),
          catchError((error) => {
            console.error('Login failed: ', error);
            this.loggedIn = false;
            return of(false);
          })
        );
    } else {
      this.loggedIn = false;
      return of(false);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
