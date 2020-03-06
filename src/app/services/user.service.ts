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
  name = `${environment.backendUri}/api/users`;
  constructor(
    private readonly http: HttpClient,
  ) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.name}/test`);
  }
}
