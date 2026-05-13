import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FloatLabelModule, InputTextModule, FormsModule, ToggleSwitchModule, Button, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  rememberUser: boolean = false;

  today = new Date();
  year = this.today.getFullYear();

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async login() {
    try {
      await this.auth.signIn(this.email, this.password);
      this.router.navigate(['/app/dashboard']);
    } catch (err) {
      console.error(err);
    }
  }
}
