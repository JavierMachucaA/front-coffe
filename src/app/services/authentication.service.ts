import { Injectable } from '@angular/core';
import { CredentialDto } from '../internal/credential.dto';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public login(credential: CredentialDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
    .set('email', credential.email)
    .set('password', credential.password);
    console.log('loginnn call');
    return this.http.post(`http://localhost:3000/api/login`, body, { headers },  );
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }
}
