import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/internal/dto/user.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public currentUser: UserDto = null;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (this.authService.currentUser) {
      this.authService.currentUser.subscribe(x => {
        this.currentUser = x;
      });
    }
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
