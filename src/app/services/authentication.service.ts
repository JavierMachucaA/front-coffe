import { Injectable } from '@angular/core';
import { CredentialDto } from '../internal/credential.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UserDto } from '../internal/dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private name = `${environment.backendUri}/auth`;
  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUser: Observable<UserDto>;

  constructor(
    private readonly http: HttpClient,
  ) {
    const token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(credential: CredentialDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
      .set('email', credential.email)
      .set('password', credential.password);

    return this.http.post(`${this.name}/login`, body, { headers })
      .pipe(map((result: any) => {
        const user = jwt_decode(result.token);
        const userString = JSON.stringify(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', result.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public get currentUserValue(): UserDto {
    return this.currentUserSubject ? this.currentUserSubject.getValue() : null;
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
