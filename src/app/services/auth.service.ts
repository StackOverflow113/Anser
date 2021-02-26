import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private database: DatabaseService) { }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('session-anser')) {
      return true;
    } else {
      return false;
    }
  }

  public getSession(): any {
    if (this.isAuthenticated()) {
      return JSON.parse(localStorage.getItem('session-anser') || '{}');
    }
  }

  public async register(user: any): Promise<void> {
    await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then( async (result: any) => {
      await this.saveUser(result.user, true, user);
    });
  }

  public async login(user: any): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then( async (result: any) => {
      await this.saveUser(result.user, false, user);
    });
  }

  public signOut(): void {
    localStorage.removeItem('session-anser');
    location.reload();
  }

  private async saveUser(userResult: any, isNew: boolean, userModel: any): Promise<void> {
    delete userModel.password;
    let user = {};
    if (isNew) {
      user = {
        ...userModel,
        id: userResult.uid
      };
      await this.database.setUser(user);
      this.saveSession(user);
    } else {
      user = await this.database.getUser(userResult.uid);
      console.log(user);
      this.saveSession(user);
    }
  }

  public saveSession(user: any): void {
    localStorage.setItem('session-anser', JSON.stringify(user));
  }
}
