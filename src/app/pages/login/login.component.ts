import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('home').then(() => location.reload());
    }
  }

  public async onSubmit(form: NgForm): Promise<void> {
     if (form.invalid) { return; }
     try {
      console.log(this.user);
      await this.authService.login(this.user);
      this.router.navigateByUrl('home').then(() => location.reload());
    } catch (error) {
      console.log(error);
    }
  }

}
