import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access',
  imports: [FloatLabelModule, InputTextModule, FormsModule, ToggleSwitchModule, Button, RouterLink],
  templateUrl: './access.html',
  styleUrl: './access.scss',
})
export class Access {
  today = new Date();
  year = this.today.getFullYear();
}
