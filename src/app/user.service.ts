import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';
  user: User = new User();

  constructor(private http: HttpClient) {}

  // validateUser() Observable<User> {
  //   return this.http.get<User>(this.apiUrl);
  // }

  register(user:User): Observable<void> {
     return this.http.post<void>(this.apiUrl, user);
  }
}
