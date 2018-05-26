import { Injectable } from "@angular/core";
import qards, { Authentication } from 'qards-lib'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {
  private authentication: Authentication;
  public readonly uid$: BehaviorSubject<string | null> = new BehaviorSubject(null)

  constructor() {
    this.authentication = new Authentication(qards);
  }

  public async register(user: string, password: string) {
    const somewhat = await this.authentication.register(user, password)
    console.log(somewhat)
    this.uid$.next(somewhat.user.uid)
  }

  public async login(user: string, password: string) {
    let somewhat: any
    try {
      somewhat = await this.authentication.login(user, password)
      console.log(somewhat)
    } catch (error) {
      somewhat = await this.authentication.register(user, password)
    }
    this.uid$.next(somewhat.user.uid)
  }
}
