import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CredentialDto } from 'src/app/internal/credential.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    /*this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
      }
    );*/
    const credential: CredentialDto = {email : 'javier.machuca.a@gmail.com' , password : '1234'};
    this.userService.login(credential).subscribe(
      (response) => console.log(response)
    );
  }

}
