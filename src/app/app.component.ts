import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  isAuth = false;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, firestore:AngularFirestore) { 
   
    this.isAuth = this.auth.isAuthenticated();
  }
 

  signOut(): void {
    localStorage.removeItem('session-anser');
    location.reload();
  }
}
