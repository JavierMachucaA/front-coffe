import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../internal/dto/user.dto';
import { CredentialDto } from '../internal/credential.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  name = `http://localhost:3000/api/users`;
  constructor(
    private readonly http: HttpClient,
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.name}/test`);
  }

  public login(credential: CredentialDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
    .set('email', credential.email)
    .set('password', credential.password);
    return this.http.post(`http://localhost:3000/api/login`, body, { headers },  );
  }
}
