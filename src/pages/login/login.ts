import { Component } from '@angular/core';
import { SessionService } from '../../data/session';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  public user = 'florian.hafner@conclurer.com';
  public password = 'abc123';

  constructor(private readonly session: SessionService) {}

  didChangeUser(newValue: string) {
    this.user = newValue;
  }

  didChangePassword(newValue: string) {
    this.password = newValue;
  }

  cannotLogin(): boolean {
    return this.user == '' || this.password == '';
  }

  login() {
    // write an email to flo to log the user in
    this.session.login(this.user, this.password)
  }
}
